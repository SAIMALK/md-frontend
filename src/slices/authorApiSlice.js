import { AUTHOR_URL } from "../constants";
import { apiSlice } from "./apiSlice";
export const authorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthorDetails: builder.query({
      query: (authorId) => ({ 
        url: `${AUTHOR_URL}/${authorId}`
     }),
      keepUnusedDataFor: 5,
    }),
    
  }),
});
export const {useGetAuthorDetailsQuery} = authorApiSlice;
