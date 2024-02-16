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
import {device} from "@/components/styleComponents/sizes";
import {LoaderSpinner} from "@/components/LoaderSpinner";

const ContentContainer = styled.div`
  margin-top: 20px;
  margin-left: 5%;

  @media ${device.tablet} {
    align-items: center;
  }
`

const FilmSection = styled.section`
  display: grid;

  @media ${device.mobileS} {
    grid-template-columns: repeat(3, 1fr);

    grid-gap: 15px;
  }
  
  @media ${device.tablet} {
    grid-template-columns: repeat(5, 1fr);
    
    grid-gap: 25px;
  }
  
  @media ${device.laptopL} {
    grid-template-columns: repeat(5, 1fr);
    
    grid-gap: 30px;
  }
`

const InputStyle = styled(StyledInputComponent)`
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

            const uniqueData = mappedData.filter((item: ItemType, index: number, array: ItemType[]) =>
                array.findIndex((el) => el.id === item.id) === index
            )

            if (uniqueData.every((item: ItemType, index: number) => item.id === filmArr[index]?.id)) {
                return
            }

            setFilmArr(uniqueData)
        }
    }, [data, searchByName, filmArr])
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
    }, [setCurrentPage])

    useScrollListener(scrollHandler)

    const paginatedItemsPrepared = useMemo(() =>
            paginatedData.filter(Boolean),
        [paginatedData])


    const onNameFound = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchByName(event.target.value);
    };

    if (isLoading) return <LoaderSpinner/>;

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
