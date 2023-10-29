const key = import.meta.env.VITE_API_TOKEN;

async function getPictures(page: number): Promise<Response> {
  const itemsCount = 10;
  const URL = `https://www.rijksmuseum.nl/api/en/collection/?key=${key}&imgonly=true&ps=${itemsCount}&p=${page}`;
  return await fetch(URL);
}

async function searchByCentury(century = '18', page?: 1): Promise<Response> {
  const URL = `https://www.rijksmuseum.nl/api/en/collection/?key=${key}&f.dating.period=${+century}&p=${page}`;
  return await fetch(URL);
}

export { getPictures, searchByCentury };
