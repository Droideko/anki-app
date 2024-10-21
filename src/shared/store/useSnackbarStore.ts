import { create } from "zustand";
import { SNACKBAR_TYPE } from "@/src/shared/constants/snackbar";
import { SnackbarType } from "@/src/shared/types/snackbar";

interface SnackbarState {
  visible: boolean;
  message: string;
  showSnackbar: (message: string, type?: SnackbarType) => void;
  hideSnackbar: () => void;
  type: SnackbarType;
}

const useSnackbarStore = create<SnackbarState>((set) => ({
  visible: false,
  message: "",
  type: SNACKBAR_TYPE.INFO,
  showSnackbar: (message, type = SNACKBAR_TYPE.INFO) =>
    set({ visible: true, message, type }),
  hideSnackbar: () => set({ visible: false, message: "" }),
}));

export default useSnackbarStore;
