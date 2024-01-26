import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/userSlice";
import customFetchBase from "./CustomFetchBase";

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/admin/login",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
} = AuthApi;