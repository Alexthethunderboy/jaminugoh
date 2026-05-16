import { create } from 'zustand';

type CursorType = 'default' | 'view' | 'play' | 'audio';

interface AppState {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
}

export const useAppStore = create<AppState>((set) => ({
  cursorType: 'default',
  setCursorType: (type) => set({ cursorType: type }),
}));
