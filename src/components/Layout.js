import { Outlet } from "react-router-dom"; //Outlet is a component that is used to render child routes of the parent route. It is used in the parent route to render the child routes.

const Layout = () => {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
};

export default Layout;
