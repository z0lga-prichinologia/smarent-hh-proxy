export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');

  try {
    const r = await fetch(
      'https://api.hh.ru/vacancies?employer_id=5007402&per_page=20',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
          'HH-User-Agent': 'SmarentWidget/1.0 (hr@smarent.com)',
          'Accept': 'application/json',
          'Accept-Language': 'ru-RU,ru;q=0.9'
        }
      }
    );

    const body = await r.text();
    if (!r.ok) {
      return res.status(502).json({ items: [], error: 'hh.ru status ' + r.status, body: body.slice(0, 500) });
    }
    return res.status(200).json(JSON.parse(body));
  } catch (e) {
    return res.status(502).json({ items: [], error: e.message });
  }
}
