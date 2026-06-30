import { create } from 'zustand';

interface SidebarState {
  activeSidebar: String;
  setActiveSidebar: (sidebar: String) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  activeSidebar: '',
  setActiveSidebar: (sidebar: String) => set({ activeSidebar: sidebar }), 
}));
