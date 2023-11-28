import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../redux/slice/global";

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
        navigate("/");
    }
    dispatch(setToken(token));
  }, [token]);
  return children;
};

export default PrivateRoute;
