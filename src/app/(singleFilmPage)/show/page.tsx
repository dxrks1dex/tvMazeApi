'use client'
import {useSearchParams} from "next/navigation";
import useTvShows from "@/hooks/fetch/fetch";
import {styled} from "styled-components";
import StarRating from "@/components/StarRating";
import {useTranslation} from "react-i18next";

const FilmInfo = styled.section`
  display: grid;
  grid-template-columns: 0.3fr 1fr; /*0.4fr*/

  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
`

const RightSideFilmInfo = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
`

const ImageStyle = styled.img`
  border-radius: 5px;
  width: 210px;
  height: 295px;
`

const FilmName = styled.h1`
  font-weight: 600;
  font-size: 25px;

  color: white;
`

const TextStyle = styled.span`
  color: white;
  position: relative;

  line-height: 1.2;

  font-size: 20px;
`

const FilmPage = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get('id');
    const {t, i18n} = useTranslation();

    const {data} = useTvShows({id})

    return (
        <>
            <FilmInfo>
                <div>
                    <ImageStyle src={data?.image?.original}/>
                    <FilmName>{data?.name}</FilmName>
                </div>
                <RightSideFilmInfo>
                    <div>
                        <TextStyle dangerouslySetInnerHTML={{
                            __html: data?.summary ?? "",
                        }}/>
                    </div>
                    <div>
                        <TextStyle>Rating: </TextStyle>
                        <StarRating initialRating={data?.rating?.average}/>
                        <TextStyle><p>Status: {data?.status}</p></TextStyle>
                        <>{t('Завершён')}</>
                    </div>
                </RightSideFilmInfo>
            </FilmInfo>
            <p>{JSON.stringify(data)}</p>
        </>
    );
};

export default FilmPage;
