const express = require('express');
const path = require('path');
const app = express();
const cors=require("cors");
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
// جستجوی شهر: هر شهری در دنیا، با اسم فارسی یا انگلیسی
app.get('/search', async (req, res) => {
  const q = (req.query.q || '').trim();
  if (q.length < 2) return res.json([]);

  try {
    const url =
      'https://geocoding-api.open-meteo.com/v1/search?count=6&language=fa&name=' +
      encodeURIComponent(q);
    const r = await fetch(url);
    const d = await r.json();

    res.json(
      (d.results || []).map((p) => ({
        name: p.name,
        region: p.admin1 || '',
        country: p.country || '',
        lat: p.latitude,
        lon: p.longitude
      }))
    );
  } catch (err) {
    res.status(500).json({ error: 'search failed' });
  }
});

// آب‌وهوای فعلی و پیش‌بینی ۷ روزه بر اساس مختصات
app.get('/weather', async (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lon = parseFloat(req.query.lon);

  if (!isFinite(lat) || !isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return res.status(400).json({ error: 'lat and lon are required' });
  }

  try {
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=' + lat +
      '&longitude=' + lon +
      '&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day' +
      '&daily=temperature_2m_max,temperature_2m_min' +
      '&timezone=auto&forecast_days=7';
    const r = await fetch(url);
    const w = await r.json();

    if (!w.current) throw new Error('bad response');
    res.json({ current: w.current, daily: w.daily });
  } catch (err) {
    res.status(500).json({ error: 'weather service failed' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});