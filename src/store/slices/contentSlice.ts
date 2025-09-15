import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'requested' | 'in-progress' | 'published';
  createdAt: string;
  updatedAt: string;
  slug?: string;
  author?: string;
  tags?: string[];
}

interface ContentState {
  items: ContentItem[];
  isLoading: boolean;
  error: string | null;
  filter: 'all' | 'requested' | 'in-progress' | 'published';
  searchQuery: string;
}

const initialState: ContentState = {
  items: [],
  isLoading: false,
  error: null,
  filter: 'all',
  searchQuery: '',
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setItems: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<ContentItem>) => {
      state.items.unshift(action.payload);
    },
    updateItem: (state, action: PayloadAction<ContentItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setFilter: (state, action: PayloadAction<ContentState['filter']>) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setLoading, setError, setItems, addItem, updateItem, setFilter, setSearchQuery } = contentSlice.actions;
export default contentSlice.reducer;