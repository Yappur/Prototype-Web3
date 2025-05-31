import { NavLink } from "react-router-dom";
import RaizFavicon from "../../assets/RaizFavicon.svg?react";
import HomeIcon from "../../assets/icons/homeIcon.svg?react";
import FolderIcon from "../../assets/icons/folderIcon.svg?react";
import ExitIcon from "../../assets/icons/exitIcon.svg?react";

export const Sidebar = () => {
  return (
    <aside className="bg-sidebar max-w-[100px] fixed h-screen flex flex-col items-center justify-between px-8 py-8">
      <RaizFavicon />

      <div className="flex flex-col gap-8">
        <NavLink to="/Producers">
          {({ isActive }) => (
            <HomeIcon
              className="hover:stroke-icon-hover transition-colors"
              stroke={isActive ? "#FF7F40" : "black"}
            />
          )}
        </NavLink>

        <NavLink to={"/products"}>
          {({ isActive }) => (
            <FolderIcon
              className="hover:stroke-icon-hover transition-colors"
              stroke={isActive ? "#FF7F40" : "black"}
            />
          )}
        </NavLink>
      </div>
      <ExitIcon
        className="hover:stroke-icon-hover transition-colors cursor-pointer"
        stroke="black"
      />
    </aside>
  );
};
