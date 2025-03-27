const supabase = require('../utils/supabase');

async function validateApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({ error: 'API Key is required' });
    }

    const { data, error } = await supabase
        .from('merchants')
        .select('id')
        .eq('api_key', apiKey)
        .single();

    if (error || !data) {
        return res.status(403).json({ error: 'Invalid API Key' });
    }

    req.merchantId = data.id;
    next();
}

module.exports = validateApiKey;
