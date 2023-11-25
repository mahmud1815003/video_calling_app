import { useMemo, useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import PublicLayout from "./pages/PublicLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UseAuth from "./utils/UseAuth";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

function App() {
  const [mode, setMode] = useState("dark");
  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode: mode },
        typography: { fontFamily: "Fira Sans" },
      }),
    [mode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <UseAuth>
          <Routes>
            <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<PublicRoute><PublicLayout /></PublicRoute>}>
              <Route path="/" element={<Navigate to={"/login"} />} replace />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
          </Routes>
        </UseAuth>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
