import { ReactNode } from "react";

export interface ModalProps {
  closeClick: () => void;
  children?: ReactNode;
  showModal: "open" | "hide";
  runFunctions?: boolean;
  id?: string;
  bookmarkId?: string;
}
