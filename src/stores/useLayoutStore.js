import { create } from 'zustand';

const useLayoutStore = create((set) => ({
    isCollapsed: false,
    isManuallyExpanded: false,

    toggleSidebar: () =>
        set((state) => ({
          isCollapsed: !state.isCollapsed,
          isManuallyExpanded: state.isCollapsed,
        })),
      setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
      setManuallyExpanded: (expanded) => set({ isManuallyExpanded: expanded }),
      resetState: () => set({ isCollapsed: false, isManuallyExpanded: false }),
    }));

export default useLayoutStore;