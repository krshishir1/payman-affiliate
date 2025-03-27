const supabase = require("../utils/supabase");
const payman = require("../utils/payman");
const cron = require("node-cron");

async function processPayment(payeeId, amount, memo ) {
    const response = await payman.payments.sendPayment({
        amountDecimal: amount,
        payeeId,
        memo,
      })

    console.log(`Transaction response for ${payeeId} of ${amount} was here: `, response)  

    return response.reference;
}

const getInterval = (frequency) => {
  switch (frequency) {
    case "weekly":
      return 7 * 24 * 60 * 60 * 1000;
    case "monthly":
      return 30 * 24 * 60 * 60 * 1000;
    default:
      return 30 * 24 * 60 * 60 * 1000; // Default to monthly
  }
};

async function processPayouts() {
  try {
    const { data: commissions, error: commissionsError } = await supabase
      .from("commissions")
      .select("affiliate_id, program_id, amount")
      .eq("status", "approved");

    const { data: aff_programs, error: aff_programs_error } = await supabase
      .from("affiliate_programs")
      .select("*");

    const { data: all_payouts, error: payoutsError } = await supabase
      .from("payouts")
      .select("*");

    let affiliate_programs = {};
    aff_programs.forEach(({ id, commission_structure }) => {
      affiliate_programs[id] = commission_structure.payout_threshold;
    });

    if (commissionsError)
      throw new Error("Error fetching commissions from the database");

    const affiliatePayouts = {}; // { affiliate_id: { total: number } }

    commissions.forEach(({ affiliate_id, program_id, payee_id, name, amount }) => {
      if (!affiliatePayouts[affiliate_id]) {
        affiliatePayouts[affiliate_id] = { total: amount, program_id, payee_id, name };
      }
      affiliatePayouts[affiliate_id].total += amount;
    });

    for (const affiliate_id of Object.keys(affiliatePayouts)) {
      const {totalAmount, payee_id, program_id, name: affiliate_name} = affiliatePayouts[affiliate_id];

      let current_program = aff_programs.find((program) => program.id === program_id);
      let program_name = current_program.name;
      let payout_threshold = current_program.commission_structure.payout_threshold;
      let payout_frequency = current_program.commission_structure.payout_frequency;

      if (totalAmount <= 0) continue; // Skip if no commissions
      if (totalAmount < payout_threshold) continue; // Skip if payout is less than the threshold

      const lastPayout = all_payouts.find((payout) => payout.affiliate_id === affiliate_id && payout.program_id === program_id);
      const lastPayoutDate = lastPayout ? new Date(lastPayout.created_at) : null;
      const isDue = !lastPayoutDate || new Date() - lastPayoutDate >= getInterval(payout_frequency ? payout_frequency : "monthly");

      if (!isDue) continue; // Skip if payout is not due

      console.log(`Payout initiated for affiliate: ${affiliate_id}, amount: $${totalAmount}`);
      const txRef = await processPayment(payee_id, totalAmount, `Payout for ${affiliate_name} from ${program_name}`);

      // Create a payout record
      const { data: payout, error: payoutError } = await supabase.from("payouts").insert([
        {
          affiliate_id,
          program_id,
          amount: totalAmount,
          transaction_id: txRef,
        },
      ]);

      if (payoutError) throw payoutError;

      // Mark commissions as paid
      const { error: updateError } = await supabase
        .from("commissions")
        .update({ status: "paid" })
        .eq("affiliate_id", affiliate_id)
        .eq("status", "approved");

      if (updateError) throw updateError;
    }

    console.log("Payout processing completed.");
  } catch (err) {
    return res.status(500).json({
      message: "Failed to process payouts",
      error: err.message,
    });
  }
}

cron.schedule("0 0 * * *", () => {
    console.log("Running daily payout cron job...");
    processPayouts();
  });