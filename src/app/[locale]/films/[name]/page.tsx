'use client'
import React, {ChangeEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {styled} from "styled-components";
import {useSearchContext} from "@/hooks/searchContext";
import {CardContainer} from "@/components/CardContainer";
import {usePaginateData} from "@/hooks/common/usePaginateData";
import {isElementAtBottomOfPage} from "@/utilits/dom/isElementAtBottomOfPage";
import {useScrollListener} from "@/hooks/dom/useScrollListener";
import {StyledInputComponent} from "@/components/styleComponents/InputStyle";
import useTvShows from "@/hooks/fetch/fetch";

const ContentContainer = styled.div`
  margin-top: 20px;
  margin-left: 5%;
`

const FilmSection = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`

const InputStyle = styled(StyledInputComponent)`
  width: 29rem;

  margin-bottom: 1%;
`;

type ItemType = {
    show: string | null,

    _links: {
        self: {
            href: string;
        };
    };

    image: {
        original: string;
    };

    name: string;
    id: number;
    summary: string;
}

export default function FilmList() {
    const {data: {searchByName, currentPage}, operations: {setCurrentPage, setSearchByName}} = useSearchContext()
    const [filmArr, setFilmArr] = useState([])
    const {data, isLoading, error, isFetching} = useTvShows({searchByName, currentPage});

    useEffect(() => {
        if (data) {
            const mappedData = data?.map((item: ItemType) => (item.show ? item.show : item));
            setFilmArr(mappedData);
        }
    }, [data, searchByName]);
    console.log(data)

    const paginatedData = usePaginateData({
        data: filmArr,
        currentPage
    })

    const isFetchingRef = useRef(isFetching);
    isFetchingRef.current = isFetching;

    const scrollHandler = useCallback(() => {
        if (isElementAtBottomOfPage() && !isFetchingRef.current) {
            setCurrentPage((prevPage) => prevPage + 1)
            console.log(currentPage)
        }
        //add logic to scroll 10 elements (don't scroll)
    }, [setCurrentPage])

    useScrollListener(scrollHandler)

    const paginatedItemsPrepared = useMemo(() =>
            paginatedData.filter(Boolean),
        [paginatedData])


    const onNameFound = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchByName(event.target.value);
    };

    if (isLoading) return <>Loading...</>;

    if (error) return <>An error has occurred: {(error as Error).message}</>;

    return (
        <ContentContainer>
            <InputStyle onChange={onNameFound} value={searchByName}/>
            {paginatedItemsPrepared ? (
                <FilmSection>
                    {paginatedItemsPrepared?.map((item: ItemType) => (
                        <CardContainer key={item.id} {...item}/>
                    ))}</FilmSection>
            ) : (
                <p>Loading...</p>
            )}
        </ContentContainer>
    );
}
