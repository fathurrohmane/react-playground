import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { GlobalContextProvider } from "./context/GlobalContext.jsx"

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <GlobalContextProvider>
        <Router />
      </GlobalContextProvider>
    </MantineProvider>
  );
}
