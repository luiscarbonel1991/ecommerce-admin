"use client";

import {useStoreModal} from "@/hooks/use-store-modal";
import {useEffect} from "react";

export default function MainPage() {

    const open = useStoreModal(state => state.open)
    const onOpen = useStoreModal(state => state.onOpen)

    useEffect(() => {
        if(!open) {
            onOpen()
        }
    }, [open, onOpen]);


    return null;
}
