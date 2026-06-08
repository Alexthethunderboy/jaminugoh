import { create } from 'zustand';

type CursorType = 'default' | 'view' | 'play' | 'audio';

export interface Track {
  id: string;
  title: string;
  url: string;
  duration?: string;
  category?: string;
}

interface AppState {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
  isInfoOpen: boolean;
  toggleInfo: () => void;
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  stopTrack: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  cursorType: 'default',
  setCursorType: (type) => set({ cursorType: type }),
  isInfoOpen: false,
  toggleInfo: () => set((state) => ({ isInfoOpen: !state.isInfoOpen })),
  currentTrack: null,
  isPlaying: false,
  playTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  stopTrack: () => set({ currentTrack: null, isPlaying: false }),
}));
