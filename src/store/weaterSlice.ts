import { createAsyncThunk, createSlice, Store } from '@reduxjs/toolkit';
import axios from 'axios';
import { IconType } from '../utilities/IconType';

interface Weather {
  data: any;
  isLoading: boolean;
  error?: string;
};

export const getWeather = createAsyncThunk<any, any, any>(
  'weather/getWeather',
  async (cityName) => {
    try {
      const coordinates = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`);
      const { latitude,  longitude } = coordinates.data.results[0];
    
      const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain,cloud_cover&timezone=auto&forecast_days=1`);
      const { temperature_2m, rain, cloud_cover } = response.data.hourly;
      const temperature = [];

      const getIconType = (cloud_cover: number, rain: number) => {
        let iconType = '';
        iconType = 
          (cloud_cover > 50) ? IconType.HEAVY_CLOUD :
          (cloud_cover > 30) ? IconType.MODERATE_CLOUD : IconType.LIGHT_CLOUD;
        iconType = 
          (rain > 7.6) ? IconType.HEAVY_RAIN :
          (rain > 2.5) ? IconType.MODERATE_RAIN : 
          (rain > 1) ? IconType.LIGHT_RAIN : iconType;
        
        return iconType;
      };

      for (let i = 6; i <= 18; i += 3) {
        temperature.push({
          id: cityName + i,
          time: `${i}:00`,
          temp: temperature_2m[i],
          iconType: getIconType(cloud_cover[i], rain[i]),
        });
      }
      return temperature;
    } catch (e) {
      throw new Error('Введите правильное название города');
    }
  }
);

const initialState: Weather = {
  data: null,
  isLoading: false,
  error: '',
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder.addCase(getWeather.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(getWeather.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWeather.rejected, (state, action) => {
      state.data = null;
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
});

export const selectWeather = (store: Store) => store.weather.data;
export const selectWeatherLoading = (store: Store) => store.weather.isLoading;
export const selectWeatherError = (store: Store) => store.weather.error;

export const weatherReducer = weatherSlice.reducer;