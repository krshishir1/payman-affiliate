const supabase = require("../supabase/client");
const { validateSchema } = require("../utils/misc");
const payman = require("../utils/payman");

const affiliateSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  payment_details: Joi.object().required(),
  payout_method: Joi.string().valid("ACH", "CRYPTO").optional(),
  program_id: Joi.string().uuid().required(),
});

async function batchAddAffiliates(req, res) {
  try {
    const { program_id, affiliates } = req.body;
    const validAffiliates = [];

    if (!program_id) throw new Error("Program ID is required");
    for (const affiliate of affiliates) {
      const errorEmails = [];
      const { error } = affiliateSchema.validate({ ...affiliate, program_id });
      if (error) {
        errorEmails.push(affiliate.email);
      } else validAffiliates.push(affiliate);
    }

    const { data: existingAffiliates, error: fetchError } = await supabase
      .from("affiliates")
      .select("email")
      .eq("program_id", program_id);

    if (fetchError) throw new Error("Error fetching existing affiliates");

    const existingEmails = new Set(existingAffiliates.map((a) => a.email));
    let newAffiliates = validAffiliates.filter(
      (a) => !existingEmails.has(a.email)
    );

    newAffiliates = newAffiliates.map((a) => ({ ...a, program_id }));

    const { data, error: insertError } = await supabase
      .from("affiliates")
      .insert(newAffiliates);

    if (insertError) throw new Error("Error inserting affiliates");

    return res.status(201).json({
      message: "Affiliates added successfully",
      inserted: data.length,
      invalid_affiliates: errorEmails.map((a) => a.email),
      existing_affiliates: [...existingEmails],
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to batch add affiliates",
      error: err.message,
    });
  }
}

async function addAffiliate(req, res) {
  try {
    const { program_id, new_affiliate } = req.body;
    if (!program_id) throw new Error("Program ID is required");

    const value = validateSchema(affiliateSchema, new_affiliate);

    const { name, email, payment_details, payout_method } = value;

    const { data: existingAffiliates, error: fetchError } = await supabase
      .from("affiliates")
      .select("email")
      .eq("program_id", program_id);

    if (fetchError) throw new Error("Error fetching existing affiliates");

    if(existingAffiliates.some(a => a.email === email)) {
        throw new Error("Affiliate with this email already exists");
    }

    let payee;
    if (payout_method === "CRYPTO") {
      payee = await payman.payments.createPayee({
        type: "CRYPTO_ADDRESS",
        ...payment_details,
      });
    } else {
      payee = await payman.payments.createPayee({
        type: "US_ACH",
        ...payment_details,
      });
    }

    if (!payee.id)
      throw new Error("Failed to create payee for the new affiliate");

    const { data, error: insertError } = await supabase
      .from("affiliates")
      .insert({ name, email, program_id, payout_method, payment_details, payee_id: payee.id });

    if (insertError) throw new Error("Error inserting new affiliate into database");
    
    return res.status(201).json({
        message: "Affiliate added successfully",
        affiliate: data[0],
    });
    
  } catch (err) {
    return res.status(500).json({
      message: "Failed to add new affiliate to the program",
      error: err.message,
    });
  }
}

async function getAffiliatesByProgramId(req, res) {
  try {
    const { program_id } = req.query;

    if (!program_id) throw new Error("Program ID is required");

    const { data, error } = await supabase
      .from("affiliates")
      .select("*")
      .eq("program_id", program_id);

    if (error) throw new Error("Error fetching affiliates from database");

    return res.status(200).json({
      affiliates: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch affiliates by program ID",
      error: error.message,
    });
  }
}

module.exports = {
  batchAddAffiliates,
  getAffiliatesByProgramId,
  addAffiliate,
};
