import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface Weather {
  data: any;
};

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async ({ cityName }: { cityName: string }) => {
    try {
      const coordinates = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`);
      const { latitude,  longitude } = coordinates.data.results[0];
    
      const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1`);
      const { temperature_2m } = response.data.hourly;
      const temperature = [];
      for (let i = 6; i <= 18; i += 1) {
        temperature.push({
          time: `${i}:00`,
          temp: temperature_2m[i],
        });
      }
      return temperature;
    } catch (e) {
      throw new Error('Check the cuty name is correct');
    }
  }
);

const initialState: Weather = {
  data: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder.addCase(getWeather.fulfilled, (state, action) => {
      state.data = action.payload;
      console.log('End loading');
      console.log(action.payload)
    });
    builder.addCase(getWeather.pending, () => {
      console.log('Start loading');
    });
    builder.addCase(getWeather.rejected, (state, action) => {
      state.data = null;
      console.log('End loading');
      console.log(action.error.message);
    });
  }
});

export const weatherReducer = weatherSlice.reducer;