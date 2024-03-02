import {create} from "zustand";

interface useSidebar{
    expanded: boolean
    onOpen: () => void
    onClose: () => void
}

export const useSidebar = create<useSidebar>((set) => ({
    expanded: true,
    onOpen: () => set({expanded: true}),
    onClose: () => set({expanded: false})
}))