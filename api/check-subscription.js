// /api/check-subscription.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const userId = req.query.user_id; // получаем user_id после OAuth
  const PATREON_CREATOR_ACCESS_TOKEN = process.env.PATREON_CREATOR_ACCESS_TOKEN; // безопасно хранится в Vercel

  if (!userId) {
    return res.status(400).json({ error: "user_id required" });
  }

  try {
    const response = await fetch(`https://www.patreon.com/api/oauth2/v2/members/${userId}?include=currently_entitled_tiers`, {
      headers: {
        'Authorization': `Bearer ${PATREON_CREATOR_ACCESS_TOKEN}`
      }
    });

    const data = await response.json();

    // ID твоего уровня подписки (tier) на Patreon
    const TIER_ID = '25863458';

    // Проверяем, есть ли подписка на нужный tier
    const hasTier = data.included?.some(t => t.type === 'tier' && t.id === TIER_ID);

    res.status(200).json({ access: hasTier });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Patreon API error" });
  }
}

