import React, { useEffect } from "react";
import { useVerifyMutation } from "../redux/api/auth";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import { login, logout } from "../redux/slice/auth";

const UseAuth = ({ children }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("auth");
  const reduxToken = useSelector((state) => state.auth.token);
  const [verify, { data, error, isError, isLoading, isSuccess }] =
    useVerifyMutation();
  useEffect(() => {
    if (token) {
      verify(JSON.parse(token));
    }
  }, [token, reduxToken]);
  if (isError) {
    localStorage.clear("auth");
    dispatch(logout());
  }
  if (isSuccess) {
    dispatch(login(JSON.parse(token)));
  }
  if (isLoading) {
    return null;
  }
  return  children ;
};

export default UseAuth;
