const ENDPOINTS = {
  COINS_LIST: 'https://api.coinlore.net/api/tickers/?start=0&limit=50',
  COIN_DETAIL: 'https://api.coinlore.net/api/ticker/?id=',
};

export const fetchCoinsList = async () =>
  await fetch(ENDPOINTS.COINS_LIST)
    .then(response => response.json())
    .then(data => data);

export const fetchCoinDetailById = async id =>
  await fetch(`${ENDPOINTS.COIN_DETAIL}${id}`)
    .then(response => response.json())
    .then(data => data);
