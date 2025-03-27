const crypto = require("crypto");
const supabase = require("../utils/supabase");
const Joi = require("joi");

function generateApiKey() {
  return crypto.randomBytes(32).toString("hex");
}

const merchantSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  company_name: Joi.string().min(3).max(50).required(),
});
const emailSchema = Joi.string().email().required();
const affiliateProgramSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  structure: Joi.object({
    commission_type: Joi.string()
      .valid("percentage", "flat", "recurring")
      .required(),

    payout_threshold: Joi.number().min(1).required(),

    payout_frequency: Joi.string()
      .valid("weekly", "monthly")
      .required(),

    commission_rate: Joi.number().min(0).required(),
  }),
});

function validateSchema(schema, stuff) {
  const { error, value } = schema.validate(stuff);
  if (error) throw new Error(error.details[0].message);
  return value;
}

async function registerNewMerchant(req, res) {
  try {
    const value = validateSchema(merchantSchema, req.body);

    const { name, email, company_name } = value;
    const apiKey = generateApiKey();

    const { data, dbError } = await supabase
      .from("merchants")
      .insert([{ name, email, company_name, api_key: apiKey }])
      .select();

    if (dbError) throw new Error(dbError.message);

    res.status(201).json({ merchant: data[0], apiKey });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to register new merchant",
      error: error.message,
    });
  }
}

async function getMerchantByEmail(req, res) {
  try {
    const value = validateSchema(emailSchema, req.query.email);

    const { data, dbError } = await supabase
      .from("merchants")
      .select("*")
      .eq("email", value)
      .single();

    if (dbError) throw new Error(dbError.message);

    res.status(200).json({ merchant: data });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get merchant by email",
      error: error.message,
    });
  }
}

async function getMerchantDetails(req, res) {
  try {
    const merchantId = req.merchantId;

    const { data, dbError } = await supabase
      .from("merchants")
      .select("*")
      .eq("id", merchantId)
      .single();

    if (dbError) throw new Error(dbError.message);

    res.status(200).json({ merchant: data });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get merchant details",
      error: error.message,
    });
  }
}

async function createAffiliateProgram(req, res) {
  try {
    const merchantId = req.merchantId;
    const value = validateSchema(affiliateProgramSchema, req.body);

    const { name, structure } = value;
    let { commission_type, payout_threshold, payout_frequency, commission_rate } = structure;

    if(commission_type === "percentage" && commission_rate > 100) {
        throw new Error("Commission rate must be between 0 and 100 for percentage commission");
    }

    const { data, dbError } = await supabase
      .from("affiliate_programs")
      .insert([{ merchant_id: merchantId, name, structure }])
      .select();

    if (dbError) throw new Error(dbError.message);

    res.status(201).json({ program: data[0] });
    
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create affiliate program",
      error: error.message,
    });
  }
}

async function getAffiliateProgramsOfMerchant(req, res) {
    try {
        const merchantId = req.merchantId;

        const { data, dbError } = await supabase
            .from("affiliate_programs")
            .select("*")
            .eq("merchant_id", merchantId);

        if (dbError) throw new Error(dbError.message);

        res.status(200).json({ programs: data });

    } catch(error) {
        return res.status(500).json({
            message: "Failed to get affiliate programs of merchant",
            error: error.message,
        })
    }
}

module.exports = {
  registerNewMerchant,
  getMerchantByEmail,
  getMerchantDetails,
  createAffiliateProgram,
  getAffiliateProgramsOfMerchant,
};
