const key = import.meta.env.VITE_API_TOKEN;

async function searchByCentury(
  century = '1',
  page? = 1,
  itemsOnPage? = 10
): Promise<Response> {
  const URL = `https://www.rijksmuseum.nl/api/en/collection/?key=${key}&imgonly=true&f.dating.period=${+century}&ps=${itemsOnPage}&p=${page}`;
  return await fetch(URL);
}

async function getCardsData(page: number): Promise<Response> {
  const itemsCount = 10;
  const URL = `https://www.rijksmuseum.nl/api/en/collection/?key=${key}&imgonly=true&ps=${itemsCount}&p=${page}`;
  return await fetch(URL);
}

async function getPictureByKey(key: string): Promise<{ data: Response }> {
  const URL = `https://www.rijksmuseum.nl/api/en/collection/${key}?&imgonly=true&key=OS3z3UmI`;
  const data = await fetch(URL);
  return { data };
}

export { getCardsData, searchByCentury };
