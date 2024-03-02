import {create} from "zustand";
interface useStoreModalStore {
    open: boolean
    onOpen: () => void
    onClose: () => void
}

export const useStoreModal = create<useStoreModalStore>((set) => ({
    open: false,
    onOpen: () => set({open: true}),
    onClose: () => set({open: false})
}))


