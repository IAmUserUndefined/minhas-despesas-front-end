import { createGlobalStyle } from "styled-components";

import Font from "./font";

const GlobalStyle = createGlobalStyle`
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
body {
    ${Font}
	font-family: 'Spline Sans', sans-serif;
}`;

export default GlobalStyle;