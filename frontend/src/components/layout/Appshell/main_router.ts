import { useLocation } from "@tanstack/react-router";


export default function mainRouter() {
  const location = useLocation();
  const currentPath = (location.pathname === '/') ? 'home' : location.pathname.replace('/', '');

  return currentPath;
}