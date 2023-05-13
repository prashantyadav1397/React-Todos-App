import "./styles.css";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from "./Theme/Theme";
import Header from "./Headers/Header";
import TextInput from "./Inputs/TextInput";
import SubHeader from "./Headers/SubHeader";
import ToDosList from "./ToDosList/ToDosList";
import ScrollToTop from "./Footers/ScrollToTop";
import Footer from "./Footers/Footer";
import Divider from "@mui/material/Divider";
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Snackbars from "./Footers/Snackbars";

const App = () => {

  const muiCache = createCache({
    key: 'mui',
    prepend: true,
  });

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Header />
          <TextInput />
          <SubHeader />
          <ToDosList />
          <ScrollToTop />
          <Divider />
          <Footer />
          <Snackbars />
        </div>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App;
