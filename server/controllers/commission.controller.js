const supabase = require("../supabase/client");

const { validateSchema } = require("../utils/misc");

const commissionSchema = Joi.object({
  affiliate_id: Joi.string().uuid().required(),
  program_id: Joi.string().uuid().required(),
  amount: Joi.number().positive().required(),
  status: Joi.string().valid("pending", "approved", "paid").default("pending"),
});

async function addCommission(req, res) {
  try {
    const value = validateSchema(commissionSchema, req.body);

    const { affiliate_id, program_id, amount, status } = value;
    const { data, error: insertError } = await supabase
      .from("commissions")
      .insert([{ affiliate_id, program_id, amount, status }]);

    if (insertError) throw new Error("Error inserting commission into database");

    res.status(201).json({commission: data });

  } catch (err) {
    return res.status(500).json({
      message: "Failed to add commission for the affiliate",
      error: err.message,
    });
  }
}

async function changeCommissionStatus(req, res) {
    try {
        const {commissionId, status} = req.body

        const { data, error } = await supabase
        .from('commissions')
        .update({ status })
        .eq('id', commissionId)
        .select();

    if (updateError) throw new Error("Error approving commission with id: " + commissionId);
    if (data.length === 0) throw new Error("Commission not found or already approved");

    res.status(200).json({ commission: data });

  } catch (err) {
    return res.status(500).json({
      message: "Failed to approve commission",
      error: err.message,
    });
  }
}

async function getCommissionsByAffiliateId(req, res) {
    try {

        const { affiliate_id, program_id } = req.query;
        if(!affiliate_id) throw new Error("Affiliate id is required to fetch all commissions");

        const { data, error } = await supabase
        .from('commissions')
        .select('*')
        .eq('affiliate_id', affiliate_id)
        .eq('program_id', program_id);

        if (error) throw new Error("Error fetching commissions from database");
        
        res.status(200).json({ commissions: data });

    } catch(err) {
        return res.status(500).json({
            message: "Failed to get commissions by affiliate id",
            error: err.message,
        })
    }
}

module.exports = {
    addCommission,
    changeCommissionStatus,
    getCommissionsByAffiliateId
}

