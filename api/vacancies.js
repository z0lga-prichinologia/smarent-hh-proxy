export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');

  try {
    const r = await fetch(
      'https://api.hh.ru/vacancies?employer_id=5007402&per_page=20',
      { headers: { 'HH-User-Agent': 'SmarentWidget/1.0 (hr@smarent.com)' } }
    );
    if (!r.ok) {
      return res.status(502).json({ items: [], error: 'hh.ru status ' + r.status });
    }
    const data = await r.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(502).json({ items: [], error: e.message });
  }
}
