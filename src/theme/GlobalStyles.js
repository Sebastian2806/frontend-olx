import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
        font-family: 'Poppins', sans-serif;  
        --vh: 1vh;
        ${'' /* font-size:62.5%; */}
    }

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0; 
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`;

export default GlobalStyle;
