import { login } from "../slice/auth";
import api from "./api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/signup",
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(login(data));
          localStorage.setItem('auth', JSON.stringify(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    login: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/login",
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(login(data));
          localStorage.setItem('auth', JSON.stringify(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    verify:  builder.mutation({
      query: (data) =>  {
        return {
          method: "POST",
          url: '/auth/verify',
          body: data,
        }
      }
    })
  }),
  overrideExisting: true,
});

export const { useSignUpMutation, useLoginMutation, useVerifyMutation } = authApi;
