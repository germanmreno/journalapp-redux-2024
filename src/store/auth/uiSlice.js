import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    loading: false,
  },
  reducers: {
    startLoading: (state /* action */) => {
      state.loading = true;
    },
    finishLoading: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoading, finishLoading } = uiSlice.actions;
