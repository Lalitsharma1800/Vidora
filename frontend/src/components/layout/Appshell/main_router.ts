import { useLocation } from "@tanstack/react-router";
import { useSidebarStore } from "#/zustand/sidebarStore/useSidebar";

export default function mainRouter() {
  const location = useLocation();
  const currentPath = (location.pathname === '/') ? 'home' : location.pathname.replace('/', '');
  const setActiveSidebar = useSidebarStore((state) => state.setActiveSidebar);
  setActiveSidebar(currentPath);
}