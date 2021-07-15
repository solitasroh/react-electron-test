import MainRouter from "./components/Router";
import GlobalStyles from "./components/GlobalStyles";
import styled, { ThemeProvider } from 'styled-components';
function App() {
  return (
    <>
      <MainRouter></MainRouter>
      <GlobalStyles></GlobalStyles>
    </>
  );
}

export default App;
