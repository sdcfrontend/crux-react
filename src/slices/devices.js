import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchRecords } from '../slices/records';

const devicesAdapter = createEntityAdapter({
  selectId: device => device._id
});

export const slice = createSlice({
  name: 'devices',
  initialState: devicesAdapter.getInitialState({
    ids: []
  }),
  reducers: {},
  extraReducers: {
    [fetchRecords.fulfilled]: (state, action) => {
      devicesAdapter.upsertMany(state, action.payload.devices);
    }
  }
});

const reducer = slice.reducer;
export default reducer;

export const {
  selectById: selectDeviceById,
  selectIds: selectDeviceIds,
  selectEntities: selectDeviceEntities,
  selectAll: selectAllDevices,
  selectTotal: selectTotalDevices
} = devicesAdapter.getSelectors(state => state.devices);

// export const selectMetricsByDevice = device => {
//   if (!device) return () => [];

//   return createSelector(
//     [
//       state => selectDevice(state, device),
//       state => state.pages.ids.map(id => state.pages.entities[id])
//     ],
//     (site, pages) => {
//       return Object.keys(pages)
//         .map(p => pages[p])
//         .filter(page => device.pages.includes(page._id));
//     }
//   )
// }