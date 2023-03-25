import { Routes, Route } from "react-router-dom";
// components
// import Layout from "./components/Layout";
import Login from "./pages/auth/Login";
import AdminLogin from "./pages/auth/AdminLogin";
import Register from "./pages/auth/Register";
import AdminRegister from "./pages/auth/AdminRegister";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import { RequireAuth } from "react-auth-kit";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/Admin-login" element={<AdminLogin />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/Admin-register" element={<AdminRegister />} />
      {/* we want to protect these routes */}
      <Route index element={<Dashboard />} />
      {/* <Route
        path="/*"
        element={
          <RequireAuth loginPath={"/auth/login"}>
            <Dashboard />
          </RequireAuth>
        }
      ></Route> */}
      {/* catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
