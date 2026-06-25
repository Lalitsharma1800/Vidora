import { create } from "zustand";

type SidebarStateStore = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

export const useSidebarCollapseStore = create<SidebarStateStore>((set) => ({
  isCollapsed: true,
    toggleSidebar: () =>
    set((state) => ({
      isCollapsed: !state.isCollapsed,
    })),
}));