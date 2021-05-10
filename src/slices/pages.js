import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { fetchSites } from './sites';

const pagesAdapter = createEntityAdapter({
  selectId: page => page._id
});

export const slice = createSlice({
  name: 'pages',
  initialState: pagesAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchSites.fulfilled]: (state, action) => {
      pagesAdapter.upsertMany(state, action.payload.pages);
    }
  },
});

const reducer = slice.reducer;
export default reducer;

export const {
  selectById: selectPageById,
  selectIds: selectPageIds,
  selectEntities: selectPageEntities,
  selectAll: selectAllPages,
  selectTotal: selectTotalPages
} = pagesAdapter.getSelectors(state => state.pages);