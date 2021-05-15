import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import { arrayOfSites } from '../schemas';

const sitesAdapter = createEntityAdapter({
  selectId: site => site._id
});

export const fetchSites = createAsyncThunk(
  'sites/selectAllSites',
  async () => {
    const response = await fetch('./data/sites.json')
    // const response = await fetch('http://localhost:4000/sites')
    const data = await response.json()
    const normalized = normalize(data, arrayOfSites);

    return normalized.entities;
  }
);

export const slice = createSlice({
  name: 'sites',
  initialState: sitesAdapter.getInitialState({
    loading: true,
    error: false,
  }),
  reducers: {},
  extraReducers: {
    [fetchSites.pending]: (state) => {
      state.loading = true;
    },
    [fetchSites.fulfilled]: (state, action) => {
      sitesAdapter.upsertMany(state, action.payload.sites);
      state.loading = false;
    },
    [fetchSites.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
});

const reducer = slice.reducer;
export default reducer;

export const {
  selectById: selectSiteById,
  selectIds: selectSiteIds,
  selectEntities: selectSiteEntities,
  selectAll: selectAllSites,
  selectTotal: selectTotalSites
} = sitesAdapter.getSelectors(state => state.sites);

export const selectPagesBySiteId = siteId => {
  if (!siteId) return () => [];

  return createSelector(
    [
      state => selectSiteById(state, siteId),
      state => state.pages.ids.map(id => state.pages.entities[id])
    ],
    (site, pages) => {
      return Object.keys(pages)
        .map(p => pages[p])
        .filter(page => site.pages.includes(page._id));
    }
  )
}