import 'styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { OrderByValue } from 'context/OrderByContext';
import { orderByValues } from 'utils/defaultValues';
import { useState, useEffect } from 'react';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(localStorage.getItem('orderBy') || orderByValues.RECIENTES);
  }, []);

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <OrderByValue.Provider value={{ value, setValue }}>
        <NextNProgress color="#7c3aed" height={2} />
        <Component {...pageProps} />
      </OrderByValue.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
