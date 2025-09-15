import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  theme: 'light' | 'dark';
  readingMode: 'compact' | 'detailed';
  preferences: {
    showAnimations: boolean;
    autoRefresh: boolean;
  };
}

const initialState: UserState = {
  username: 'Anonymous User',
  theme: 'light',
  readingMode: 'detailed',
  preferences: {
    showAnimations: true,
    autoRefresh: true,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setReadingMode: (state, action: PayloadAction<'compact' | 'detailed'>) => {
      state.readingMode = action.payload;
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserState['preferences']>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
  },
});

export const { setUsername, toggleTheme, setReadingMode, updatePreferences } = userSlice.actions;
export default userSlice.reducer;