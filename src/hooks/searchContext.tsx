import {createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useMemo, useState} from "react";

interface ISearchContext {
    data: {
        searchByName: string,
        currentPage: number
        id: number | undefined
    },
    operations: {
        setSearchByName: Dispatch<SetStateAction<string>>
        setCurrentPage: Dispatch<SetStateAction<number>>
        setId: Dispatch<SetStateAction<undefined>>
    }
}

const SearchContext = createContext<ISearchContext | null>(null)
export const SearchContextWrapper: FC<{ children: ReactNode }> = ({children}) => {
    const [searchByName, setSearchByName] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [id, setId] = useState(undefined)

    const context: ISearchContext = useMemo(() => ({
        data: {
            searchByName,
            currentPage,
            id
        },
        operations: {
            setSearchByName,
            setCurrentPage,
            setId
        }
    }), [searchByName, currentPage, id, setSearchByName, setCurrentPage, setId])

    return (
        <SearchContext.Provider value={context}>{children}</SearchContext.Provider>
    )
}

export const useSearchContext = (): ISearchContext => {
    const value = useContext(SearchContext)
    if (value === null) {
        throw new Error('empty SearchContext')
    }

    return value
}