'use client'
import {useSearchParams} from "next/navigation";
import useTvShows from "@/hooks/fetch/fetch";
import {styled} from "styled-components";
import StarRating from "@/components/StarRating";
import LanguageSwitcher from "@/utilits/Translations";
import {device} from "@/components/styleComponents/sizes";
import React, {useState} from "react";
import {LoaderSpinner} from "@/components/LoaderSpinner";

const FilmInfoContainer = styled.div `
  margin: 5% 10% 5% 10%;
`

const FilmInfo = styled.section`
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  
  grid-gap: 30px;
`

const RightSideFilmInfo = styled.section`

  @media ${device.mobileS} {
    display: none;
  }
  
  @media ${device.mobileM} {
    display: none;
  }
  
  @media ${device.mobileL} {
    display: grid;
    grid-gap: 10px;
  }
`

const LeftSideFilmInfo = styled.section `
  display: grid;
  
  @media ${device.mobileS} {
    
    grid-gap: 10px;
  }

  @media ${device.mobileM} {
    
    grid-gap: 10px;
  }
  
  @media ${device.mobileL} {
    grid-template-columns: unset;
    
    grid-gap: 10px;
  }
  
  @media ${device.tablet} {
    grid-template-columns: unset;
    
    grid-gap: unset;
  }
`

const ImageStyle = styled.img`
  border-radius: 5px;
  width: 210px;
  height: 295px;

  box-shadow: 4px 6px 15px 0px rgba(0,0,0,0.75);
`

const FilmName = styled.h1`
  font-weight: 600;
  font-size: 25px;

  color: #3480ea;

  margin-top: 10px;
  
  width: 210px;
`

const TextContainer = styled.div<{overflowStyle: string}>`
  @media ${device.mobileL} {
    overflow: ${({ overflowStyle }) => overflowStyle};;
    text-overflow: ellipsis;
    
    height: 50px;
  }

  @media ${device.tablet} {
    overflow: unset;
    white-space: unset;
    
    height: unset;
    width: unset;
  }
`

const TextStyle = styled.span`
  color: #8ba0b2;

  position: relative;

  line-height: 1.2;

  font-size: 20px;
  
  @media ${device.mobileL}{
    margin-top: unset;
  }
  
  @media ${device.tablet}{
    margin-top: 30px;
  }
`

const StatusContainer = styled.section `
  display: flex;
  
  position: sticky;

  margin-top: 10px;
`

const Genre = styled.section`
  display: grid;
  width: 210px;
  
  background-color: #151f2e;
  box-shadow: 0px 4px 8px #151f2e;
  
  margin-top: 10px;

  border-radius: 5px;
  cursor: pointer;

  font-size: 17px;
  
  &:hover {
    transition: 0.4s;
    color: #3480ea;
    border: 0.1px solid #3480ea;

    font-size: 20px;
  }
`

const ReadMore = styled.div `
  @media ${device.mobileL} {
    display: block;
    
    margin-top: 10px;
    color: #3480ea;
  }

  @media ${device.tablet} {
    display: none;
  }
`

const RatingDivRightSide = styled.div `
  @media ${device.mobileS} {
    display: none;
  }
  
  @media ${device.mobileM} {
    display: none;
  }
  
  @media ${device.mobileL} {
    display: none;
  }

  @media ${device.tablet} {
    display: unset;
  }
`

const RatingMobile = styled.div `
  margin-top: 10px;

  svg {
    width: 16px;
    height: 16px;
  }
  
  @media ${device.mobileS} {
    display: initial;
  }

  @media ${device.mobileM} {
    display: initial;

  }
  
  @media ${device.mobileL} {
    display: initial;
  }

  @media ${device.tablet} {
    display: none;
  }
`

const MobileDescription = styled.span `

  @media ${device.mobileS} {
    display: initial;
  }
  
  @media ${device.mobileM} {
    display: initial;
  }

  @media ${device.mobileL} {
    display: none;
  }
`

const FilmPage = () => {
    const [overflowStyle, setOverflowStyle] = useState("hidden");
    const [readMoreClick, setReadMoreClick] = useState(true);

    const searchParams = useSearchParams()
    const id = searchParams.get('id');

    const { data, isLoading } = useTvShows({id})


    if (isLoading) return <LoaderSpinner/>;

    return (
        <FilmInfoContainer>
            <FilmInfo>
                <LeftSideFilmInfo>
                    <div>
                        <ImageStyle src={data?.image?.original}/>
                        <FilmName>{data?.name}</FilmName>
                    </div>
                        <TextStyle>Genres: {data?.genres.map((item: string) => <Genre key={item}>{item}</Genre>)}</TextStyle>
                    <div>
                        <RatingMobile>
                                <TextStyle>Rating: {data?.rating?.average}/10</TextStyle>
                                <StarRating initialRating={data?.rating?.average}/>
                                <TextStyle><StatusContainer>Status:<LanguageSwitcher status={data?.status}/></StatusContainer></TextStyle>
                        </RatingMobile>
                    </div>
                </LeftSideFilmInfo>
                <RightSideFilmInfo>
                    <div>
                        <TextContainer overflowStyle={overflowStyle}>
                            <TextStyle dangerouslySetInnerHTML={{
                                __html: data?.summary ?? "",
                            }}/>
                        </TextContainer>
                        {readMoreClick &&
                            <ReadMore onClick={() => {
                                setOverflowStyle("unset");
                                setReadMoreClick(false);
                            }}>Read More</ReadMore>}
                    </div>
                    <RatingDivRightSide>
                        <TextStyle>Rating: </TextStyle>
                        <StarRating initialRating={data?.rating?.average}/>
                        <TextStyle><StatusContainer>Status:<LanguageSwitcher status={data?.status}/></StatusContainer></TextStyle>
                    </RatingDivRightSide>
                </RightSideFilmInfo>
            </FilmInfo>
            <MobileDescription><TextContainer overflowStyle={overflowStyle}>
                <TextStyle dangerouslySetInnerHTML={{
                    __html: data?.summary ?? "",
                }}/>
            </TextContainer></MobileDescription>
        </FilmInfoContainer>
    );
};

export default FilmPage;