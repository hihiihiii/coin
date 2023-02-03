import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinList } from "../api";
import { Link } from "react-router-dom";
import { media } from "../styled";

const CoinListWrapper = styled.div`
  width: 768px;
  margin: 0px auto;
  padding-top: 40px;

  ${media.tablet`
    width : 550px;
  `};

  ${media.phone`
    width : 420px;
  `}
`;

const CoinListContainer = styled.div`
  margin-top: 20px;
  padding: 0px 100px;
  a {
    text-decoration: none;
    color: black;
  }

  ${media.tablet`
    padding : 0px 30px;
  `};
  /* 
  ${media.phone`

  `} */
`;

const CoinListTitle = styled.h1`
  text-align: center;
  font-size: 48px;
  color: #a29bfe;
  text-shadow: 2px 1px 2px gray;

  ${media.tablet`
      font-size :  36px;
  `};

  ${media.phone`
    width : 420px;
  `}
`;

const CoinName = styled.span`
  font-size: 18px;
`;

const Coin = styled.div`
  margin: 20px 0px;
  padding: 20px;
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  display: flex;
  align-items: center;
  box-shadow: 0px 10px 8px 0px rgba(0, 0, 0, 0.2);

  ${media.phone`
  
  `}

  &:hover {
    scale: 1.1;
    transition: 0.6s all ease-in-out;
    ${CoinName} {
      transition: 0.5s all ease-in-out;
      color: #a29bfe;
    }
  }
`;

const Image = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 10px;
`;

interface CoinListInfo {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: string;
}

const CoinList = () => {
  const { isLoading, data } = useQuery<CoinListInfo[]>(
    "allCoins",
    fetchCoinList
  );

  return (
    <CoinListWrapper>
      <CoinListTitle>CoinTracking</CoinListTitle>
      <CoinListContainer>
        {isLoading ? (
          <>...로딩중입니다</>
        ) : (
          data?.slice(0, 100).map((coin) => (
            <Link
              key={coin.id}
              to={`/${coin.id}/chart`}
              state={{
                name: coin.name,
                rank: coin.rank,
                symbol: coin.symbol,
              }}
            >
              <Coin>
                <Image
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />

                <CoinName>{coin.symbol}</CoinName>
              </Coin>
            </Link>
          ))
        )}
      </CoinListContainer>
    </CoinListWrapper>
  );
};

export default CoinList;
