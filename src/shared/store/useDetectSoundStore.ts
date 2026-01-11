import { create } from 'zustand';

interface DetectSoundStoreState {
  isCheck: boolean;
  isReverseCard: boolean;
  setCheck: (check: boolean) => void;
  setReverseCard: (reverseCard: boolean) => void;
  resetReverseCard: () => void;
  resetCheck: () => void;
}

export const useDetectSoundStore = create<DetectSoundStoreState>((set) => ({
  isCheck: false,
  setCheck: (isCheck: boolean) => set({ isCheck }),
  resetCheck: () => set({ isCheck: false }),
  isReverseCard: false,
  setReverseCard: (isReverseCard: boolean) => set({ isReverseCard }),
  resetReverseCard: () => set({ isReverseCard: false }),
}));
