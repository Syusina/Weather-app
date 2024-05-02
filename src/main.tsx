import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import { weatherReducer } from './store/weaterSlice.ts'
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
