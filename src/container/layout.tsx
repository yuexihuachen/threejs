import { Outlet } from "react-router";
import Nav from "./nav";

export default function Layout() {
  return (
    <div className="w-full h-dvh grid grid-cols-8 p-10">
      <div className="grid">
        <Nav />
      </div>
      <div className="col-span-6">
        <Outlet />
      </div>
    </div>
  );
}
