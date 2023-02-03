import React from "react";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";
import { media } from "../styled";

const PriceWrapper = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
  width: 768px;

  ${media.tablet`
    width : 680px;
  `};

  ${media.phone`
    width : 600px;
  `}
`;

const PriceContainer = styled.div`
  box-sizing: border-box;
  background-color: white;
  padding: 20px;
  border-radius: 16px;
`;

const PriceBoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 100px;
  grid-gap: 1rem;
  grid-template-areas: "a a";
  margin-top: 10px;
`;

const PriceFluctuationBox = styled.div<{ direction?: string }>`
  display: flex;
  justify-content: space-between;
  flex-direction: ${(props) => (props.direction === "row" ? "row" : "column")};
  box-shadow: 0px 10px 8px 0 rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 16px;
  padding: 20px;
  margin: 10px 0px;

  &:first-child {
    grid-area: a;
  }
`;

const AthBox = styled.div`
  color: ${(props) => props.theme.textColor};

  line-height: 30px;
  opacity: 0.6;
`;

const AthPrice = styled.div`
  font-size: 24px;
  font-weight: bold;
  align-self: center;
  color: ${(props) => props.theme.textColor};
`;

const ChangePaceTitle = styled.div`
  color: ${(props) => props.theme.textColor};
`;

const ChangePaceBox = styled.div`
  /* color: #33bd65; */
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ChangePaceText = styled.div<{ up?: boolean }>`
  font-size: 32px;
  color: ${(props) => (props.up ? "red" : "#33bd65")};
`;

const ChangePaceIcon = styled.div<{ up?: boolean }>`
  font-size: 32px;
  color: ${(props) => (props.up ? "red" : "#33bd65")};
`;

interface IPrice {
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
}

const Price = () => {
  const location = useLocation();
  const state = location.state as IPrice;
  const isDark = useRecoilValue(isDarkAtom);

  const date = new Date(state?.ath_date);
  const dateString = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  // <BiTrendingUp></BiTrendingUp>
  // <BiTrendingDown></BiTrendingDown>

  return (
    <PriceWrapper>
      <PriceBoxContainer>
        <PriceFluctuationBox direction={"row"}>
          <AthBox>
            {dateString}
            <br /> 최고가 달성
          </AthBox>
          <AthPrice>${(state?.ath_price).toFixed(3)}</AthPrice>
        </PriceFluctuationBox>

        <PriceFluctuationBox>
          <ChangePaceTitle>1시간 전보다</ChangePaceTitle>
          <ChangePaceBox>
            <ChangePaceText up={state?.percent_change_1h > 0}>
              {state?.percent_change_1h}%
            </ChangePaceText>
            <ChangePaceIcon up={state?.percent_change_1h > 0}>
              {state?.percent_change_1h > 0 ? (
                <BiTrendingUp></BiTrendingUp>
              ) : (
                <BiTrendingDown></BiTrendingDown>
              )}
            </ChangePaceIcon>
          </ChangePaceBox>
        </PriceFluctuationBox>

        <PriceFluctuationBox>
          <ChangePaceTitle>6시간 전보다</ChangePaceTitle>
          <ChangePaceBox>
            <ChangePaceText up={state?.percent_change_6h > 0}>
              {state?.percent_change_6h}%
            </ChangePaceText>
            <ChangePaceIcon up={state?.percent_change_6h > 0}>
              {state?.percent_change_6h > 0 ? (
                <BiTrendingUp></BiTrendingUp>
              ) : (
                <BiTrendingDown></BiTrendingDown>
              )}
            </ChangePaceIcon>
          </ChangePaceBox>
        </PriceFluctuationBox>
        <PriceFluctuationBox>
          <ChangePaceTitle>12시간 전보다</ChangePaceTitle>
          <ChangePaceBox>
            <ChangePaceText up={state?.percent_change_12h > 0}>
              {state?.percent_change_12h}%
            </ChangePaceText>
            <ChangePaceIcon up={state?.percent_change_12h > 0}>
              {state?.percent_change_12h > 0 ? (
                <BiTrendingUp></BiTrendingUp>
              ) : (
                <BiTrendingDown></BiTrendingDown>
              )}
            </ChangePaceIcon>
          </ChangePaceBox>
        </PriceFluctuationBox>
        <PriceFluctuationBox>
          <ChangePaceTitle>24시간 전보다</ChangePaceTitle>
          <ChangePaceBox>
            <ChangePaceText up={state?.percent_change_24h > 0}>
              {state?.percent_change_24h}%
            </ChangePaceText>
            <ChangePaceIcon up={state?.percent_change_24h > 0}>
              {state?.percent_change_24h > 0 ? (
                <BiTrendingUp></BiTrendingUp>
              ) : (
                <BiTrendingDown></BiTrendingDown>
              )}
            </ChangePaceIcon>
          </ChangePaceBox>
        </PriceFluctuationBox>
        <PriceFluctuationBox>
          <ChangePaceTitle>7일 전보다</ChangePaceTitle>
          <ChangePaceBox>
            <ChangePaceText up={state?.percent_change_7d > 0}>
              {state?.percent_change_7d}%
            </ChangePaceText>
            <ChangePaceIcon up={state?.percent_change_7d > 0}>
              {state?.percent_change_7d > 0 ? (
                <BiTrendingUp></BiTrendingUp>
              ) : (
                <BiTrendingDown></BiTrendingDown>
              )}
            </ChangePaceIcon>
          </ChangePaceBox>
        </PriceFluctuationBox>
        <PriceFluctuationBox>
          <ChangePaceTitle>30일 전보다</ChangePaceTitle>
          <ChangePaceBox>
            <ChangePaceText up={state?.percent_change_30d > 0}>
              {state?.percent_change_30d}%
            </ChangePaceText>
            <ChangePaceIcon up={state?.percent_change_30d > 0}>
              {state?.percent_change_30d > 0 ? (
                <BiTrendingUp></BiTrendingUp>
              ) : (
                <BiTrendingDown></BiTrendingDown>
              )}
            </ChangePaceIcon>
          </ChangePaceBox>
        </PriceFluctuationBox>
      </PriceBoxContainer>
    </PriceWrapper>
  );
};

export default Price;
