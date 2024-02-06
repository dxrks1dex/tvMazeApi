import {useEffect, useRef, useState} from 'react'

type PagDataProps<T> = {
    data: T[] | null | undefined
    currentPage: number
}

export function usePaginateData<T>({data, currentPage}: PagDataProps<T>): T[] {
    const [paginatedData, setPaginatedData] = useState<T[]>([])

    const currentPageRef = useRef(currentPage)
    currentPageRef.current = currentPage

    const prevPageRef = useRef<number | undefined>(undefined)

    useEffect(() => {
        const prevPage = prevPageRef.current

        if (prevPage !== undefined && prevPage >= currentPageRef.current) {
            setPaginatedData(data ?? [])
        } else if (data !== undefined) {
            setPaginatedData(trendingOutput => ([...trendingOutput, ...(data ?? [])]))
        }
        prevPageRef.current = currentPageRef.current
    }, [data])

    return paginatedData
}
