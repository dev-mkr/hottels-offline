import { Routes, Route } from "react-router-dom";
// components
import Layout from "./components/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
// import Index from "./pages/Index";
import { RequireAuth } from "react-auth-kit";

function App() {
  return (
    <div>
      <Routes>
        {/* public routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        {/* we want to protect these routes */}

        <Route
          path="/"
          element={
            <RequireAuth loginPath={"/auth/login"}>
              <Dashboard />
            </RequireAuth>
          }
        ></Route>

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route> */}

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
