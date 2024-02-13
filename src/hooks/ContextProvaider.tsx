'use client'
import {ReactNode} from "react";
import {SearchContextWrapper} from "@/hooks/searchContext";

export const ContextProvider = ({children}: { children: ReactNode }) => {

    return <SearchContextWrapper>{children}</SearchContextWrapper>
}