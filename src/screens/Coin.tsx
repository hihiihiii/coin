import React from "react";
import {
  useLocation,
  useParams,
  useNavigate,
  Routes,
  Route,
  useMatch,
  Link,
} from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";
import { media } from "../styled";

const CoinListWrapper = styled.div`
  width: 768px;
  margin: 0px auto;
  padding: 0px 20px;
  padding-top: 40px;

  ${media.tablet`
    width : 680px;
  `};

  ${media.phone`
    width : 600px;
  `}
`;

const CoinListTitle = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 48px;
  color: #a29bfe;
  text-shadow: 2px 1px 2px gray;
`;

const CoinListContainer = styled.div`
  margin-top: 20px;

  a {
    text-decoration: none;
    color: black;
  }
`;

const CoinHeader = styled.div`
  display: flex;
  align-items: center;
`;

const BackBtn = styled.div`
  cursor: pointer;
  font-size: 34px;
  color: #a29bfe;
`;

const InfoContainer = styled.div`
  margin: 20px 0px;
  padding: 20px;
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 10px 8px 0 rgba(0, 0, 0, 0.1);
`;

const InfoText = styled.span`
  line-height: 25px;
  font-size: 18px;
  color: ${(props) => props.theme.textColor};
`;

const InfoBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const TabCointainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    width: 48%;
  }
`;

const TabBox = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 20px;
  width: 100%;
  background-color: transparent;
  border-radius: 16px;
  font-size: 21px;
  text-align: center;
  box-sizing: border-box;
  opacity: ${(props) => (props.isActive ? 1 : 0.4)};
  color: ${(props) => props.theme.accentColor};
  transition: 0.5s all ease-in;
  &::after {
    content: "";
    position: absolute;
    height: 3px;
    bottom: 10%;
    width: 5%;
    transition: 0.5s all ease-in;
    border-radius: 1px;
    opacity: ${(props) => (props.isActive ? 1 : 0.4)};
    background-color: ${(props) => props.theme.accentColor};
  }
`;

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Coin = () => {
  const { coinId } = useParams();
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["infoData", coinId],
    () => fetchCoinInfo(coinId!)
  );

  const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(
    ["priceData", coinId],
    () => fetchCoinTickers(coinId!)
  );

  const navigate = useNavigate();

  const chartMatch = useMatch(`/:coinId/chart`);
  const priceMatch = useMatch(`/:coinId/price`);

  //Location
  const location = useLocation();
  const state = location.state;

  //날짜
  const date = new Date(`${infoData?.started_at}`);
  const converter = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <>
      <CoinListWrapper>
        <CoinHeader>
          <BackBtn onClick={() => navigate(-1)}>
            <BiChevronLeft></BiChevronLeft>
          </BackBtn>
          <CoinListTitle>
            {state?.name
              ? state?.name
              : infoLoading
              ? "Loading.."
              : infoData?.name}
          </CoinListTitle>
        </CoinHeader>
        <CoinListContainer>
          <InfoContainer>
            <InfoBox>
              <InfoText>순위 :</InfoText>
              <InfoText>{infoData?.rank}</InfoText>
            </InfoBox>
            <InfoBox>
              <InfoText>티커 :</InfoText>
              <InfoText>{infoData?.symbol}</InfoText>
            </InfoBox>
            <InfoBox>
              <InfoText> 발행일 :</InfoText>
              <InfoText>{converter}</InfoText>
            </InfoBox>
          </InfoContainer>
          <InfoContainer>
            <InfoBox>
              <InfoText>총량 :</InfoText>
              <InfoText>{priceData?.max_supply}</InfoText>
            </InfoBox>
            <InfoBox></InfoBox>
            <InfoBox>
              <InfoText>현재가 :</InfoText>
              <InfoText>${priceData?.quotes.USD.price?.toFixed(3)}</InfoText>
            </InfoBox>
          </InfoContainer>
          <TabCointainer>
            <Link to={`/${coinId}/chart`}>
              <TabBox isActive={chartMatch !== null}>Chart</TabBox>
            </Link>
            <Link to={`/${coinId}/price`} state={priceData?.quotes?.USD}>
              <TabBox isActive={priceMatch !== null}>Price</TabBox>
            </Link>
          </TabCointainer>
        </CoinListContainer>
      </CoinListWrapper>

      <Routes>
        <Route path="chart" element={<Chart coinId={coinId!} />}></Route>
        <Route path="price" element={<Price />}></Route>
      </Routes>
    </>
  );
};

export default Coin;
