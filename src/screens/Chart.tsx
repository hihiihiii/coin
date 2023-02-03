import React from "react";
import styled from "styled-components";
import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { media } from "../styled";

const ChartContainer = styled.div`
  width: 768px;
  margin: 0 auto;
  margin-top: 20px;

  ${media.tablet`
    width : 680px;
  `};

  ${media.phone`
    width : 600px;
  `}
`;

interface ChartProps {
  coinId: string;
}

interface OhlcvProps {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<OhlcvProps[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <ChartContainer>
      {isLoading ? (
        <>...로딩중입니다</>
      ) : (
        <>
          <ApexChart
            type="line"
            height={200}
            series={[
              {
                name: "price",
                data: data?.map((price) => Number(price?.close)) as number[],
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                background: "transprent",
                toolbar: {
                  show: false,
                },
              },
              fill: {
                type: "gradient",
                gradient: {
                  gradientToColors: ["#a29bfe"],
                },
              },

              grid: {
                show: false,
              },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                type: "datetime",
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                labels: {
                  show: false,
                  datetimeFormatter: { month: "mmm 'yy" },
                },
                categories: data?.map((price) =>
                  new Date(price.time_close * 1000).toISOString()
                ),
              },
            }}
          ></ApexChart>
          <ApexChart
            type="candlestick"
            height={400}
            series={
              [
                {
                  name: "Price",
                  data: data?.map((price) => {
                    return [
                      price?.time_close * 1000,
                      price?.open,
                      price?.high,
                      price?.low,
                      price?.close,
                    ];
                  }),
                },
              ] as any
            }
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                background: "transprent",
                toolbar: {
                  show: false,
                },
              },
              grid: {
                show: false,
              },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                type: "datetime",
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                labels: {
                  show: false,
                  datetimeFormatter: { month: "mmm 'yy" },
                  datetimeUTC: false,
                },
              },
            }}
          ></ApexChart>
        </>
      )}
    </ChartContainer>
  );
};

export default Chart;
