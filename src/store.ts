import { create } from 'zustand';

interface AppState {
  nfcResult: string;
  ocrResult: string;
  setNfcResult: (result: string) => void;
  setOcrResult: (result: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  nfcResult: '',
  ocrResult: '',
  setNfcResult: (result) => set({ nfcResult: result }),
  setOcrResult: (result) => set({ ocrResult: result }),
}));