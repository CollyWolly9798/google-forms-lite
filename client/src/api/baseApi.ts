import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlBaseQuery } from './graphqlBaseQuery.ts';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: graphqlBaseQuery('http://localhost:4000/graphql'),
  endpoints: () => ({}),
});
