import { Outlet } from "react-router";
import Nav from "./nav";

export default function Layout() {
  return (
    <div className="w-full h-dvh flex p-10">
      <div className="w-28">
        <Nav />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
