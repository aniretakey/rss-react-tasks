const key = import.meta.env.VITE_API_TOKEN;

async function searchByCentury(
  century = '1',
  page?: 1,
  itemsOnPage?: number
): Promise<Response> {
  const URL = `https://www.rijksmuseum.nl/api/en/collection/?key=${key}&f.dating.period=${+century}&ps=${itemsOnPage}&p=${page}`;
  return await fetch(URL);
}
// TODO: MAX IMAGES COUNT = 10 000 (itemsOnPage * page<= 10 000)

async function getCardsData(page: number): Promise<Response> {
  const itemsCount = 10;
  const URL = `https://www.rijksmuseum.nl/api/en/collection/?key=${key}&ps=${itemsCount}&p=${page}`;
  return await fetch(URL);
}

async function getPictureByKey(key: string): Promise<Response> {
  const URL = `https://www.rijksmuseum.nl/api/en/collection/${key}?key=OS3z3UmI`;
  return await fetch(URL);
}

export { getCardsData, searchByCentury };
