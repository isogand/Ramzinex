import {createSlice} from '@reduxjs/toolkit';
import {darkTheme, lightTheme} from '../constants/Colors.ts';

const themeInitialState = {
  isDarkMode: false,
  theme: lightTheme,
};

const themeReducer = {
  darkMod(state: any) {
    state.isDarkMode = !state.isDarkMode; //=== 'dark'?'light':'dark';
    state.theme = state.isDarkMode ? darkTheme : lightTheme;
  },
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: themeInitialState,
  reducers: themeReducer,
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
