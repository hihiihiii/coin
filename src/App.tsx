import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { Router } from "./Router";
import { darkTheme, lighTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atom";

const Globalstyled = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}

*{
	box-sizing: border-box;
}

body{
  background-color:${(props) => props.theme.bgColor};
  transition: .4s all ease-in;
  box-sizing: border-box;
}

a{
	text-decoration: none;
}
`;

const App = () => {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lighTheme}>
        <Globalstyled></Globalstyled>
        <Router />
        <ReactQueryDevtools></ReactQueryDevtools>
      </ThemeProvider>
    </>
  );
};

export default App;
