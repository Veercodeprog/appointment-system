import Register from "./components/Register";
import Login from "./components/Login";
import Roles from "./components/Roles";
import Users from "./components/Users";
import Services from "./components/Services";
import BookAppointment from "./components/BookAppointment";
import AppointmentManagement from "./components/AppointmentManagement";

import Layout from "./components/Layout";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import PersistLogin from "./components/PersistLogin";
import useAuth from "./hooks/useAuth";
const ROLES = {
  Customer: 2001,
  Subadmin: 2003,
  Admin: 2002,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} /> {/* Direct / route to Login */}
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[2002]} />}>
            <Route path="rolecrud" element={<Roles />} />
          </Route>
          <Route
            element={
              <RequireAuth allowedRoles={([ROLES.Admin], [ROLES.Subadmin])} />
            }
          >
            <Route path="usercrud" element={<Users />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="services" element={<Services />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Customer]} />}>
            <Route path="bookappointment" element={<BookAppointment />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Customer]} />}>
            <Route
              path="appointment-management"
              element={<AppointmentManagement />}
            />
          </Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
