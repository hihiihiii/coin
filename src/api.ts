const BASE_URL = "https://api.coinpaprika.com/v1"

export const fetchCoinList = async() => {
    return fetch(`${BASE_URL}/coins`).then((res)=>res.json());
}

//코인정보
export const fetchCoinInfo = async (coinId:string) => {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((res)=> res.json());
}

//코인가격정보
export const fetchCoinTickers = async (coinId:string) => {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((res)=> res.json());
}

//코인 차트
export const fetchCoinHistory = async (coinId:string) => {
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`).then((res)=> res.json())
}