import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ApolloProvider } from '@apollo/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import './index.css';
import { apolloClient } from './API/apolloClient.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <App />
      </LocalizationProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
