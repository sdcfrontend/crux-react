import { schema } from 'normalizr'

// Sites
export const page = new schema.Entity('pages', {}, { idAttribute: '_id' })
export const site = new schema.Entity('sites', { pages: [page] }, { idAttribute: '_id' })
export const arrayOfSites = new schema.Array(site)

// Records
export const metric = new schema.Entity('metrics', {}, { idAttribute: '_id' })
export const record = new schema.Entity('records', { metrics: [metric] }, { idAttribute: '_id' })
export const arrayOfRecords = new schema.Array(record)
