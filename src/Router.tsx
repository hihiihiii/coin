import { BrowserRouter, Route, Routes } from "react-router-dom";
import { isDarkAtom } from "./atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Coin from "./screens/Coin";
import CoinList from "./screens/CoinList";
import { BiMoon, BiSun } from "react-icons/bi";
import { media } from "./styled";

const DarkModeBtn = styled.div`
  width: 75px;
  height: 75px;
  background-color: whitesmoke;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 1%;
  bottom: 5%;
  cursor: pointer;
  font-size: 28px;
  color: #3498db;

  ${media.tablet`
    width : 50px;
    height : 50px;
    bottom : 10px;
    left : 10px
  `}
`;

export const Router = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const onToggle = () => setDarkAtom((prev) => !prev);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoinList />}></Route>
        <Route path="/:coinId/*" element={<Coin />}></Route>
      </Routes>
      <DarkModeBtn onClick={onToggle}>
        {isDark ? <BiMoon></BiMoon> : <BiSun></BiSun>}
      </DarkModeBtn>
    </BrowserRouter>
  );
};
