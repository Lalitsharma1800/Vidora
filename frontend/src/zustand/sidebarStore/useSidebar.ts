import { create } from 'zustand';

export type SidebarTab = 
        'home' | 'playlist' | 'comment' | 'subscriptions' | 'watch-later' | 'liked' | 
        'comment' | 'trending' | 'music' | 'gaming' | 'news' | 'sports' | 'settings' | 
        'help' | 'feedback';

interface SidebarState {
  activeSidebar: SidebarTab;
  setActiveSidebar: (sidebar: SidebarTab) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  activeSidebar: 'home',
  setActiveSidebar: (sidebar: SidebarTab) => set({ activeSidebar: sidebar }), 
}));
