import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
import { logout } from './authSlice';
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

console.log(BASE_URL)
  
async function baseQueryWithAuth(args, api, extra) {
  console.log('args:', args);
  console.log('api:', api);
  console.log('extra:', extra);

  const result = await baseQuery(args, api, extra);
  // Dispatch the logout action on 401.
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
}


export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth, // Use the customized baseQuery
    tagTypes: ['Story', 'User'],
    endpoints: (builder) => ({}),
});
