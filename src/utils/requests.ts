const key = import.meta.env.VITE_API_TOKEN;

async function searchByCentury(
  century = '1',
  page = 1,
  itemsOnPage = 10
): Promise<Response> {
  const URL = `https://www.rijksmuseum.nl/api/en/collection/?key=${key}&imgonly=true&f.dating.period=${+century}&ps=${itemsOnPage}&p=${page}`;
  return await fetch(URL);
}

async function getCardsData(page: number): Promise<Response> {
  const itemsCount = 10;
  const URL = `https://www.rijksmuseum.nl/api/en/collection/?key=${key}&imgonly=true&ps=${itemsCount}&p=${page}`;
  return await fetch(URL);
}

async function getPictureByKey(cardKey: string): Promise<Response> {
  const URL = `https://www.rijksmuseum.nl/api/en/collection/${cardKey}?key=${key}&imgonly=true`;
  return await fetch(URL);
}

export { getCardsData, searchByCentury, getPictureByKey };
