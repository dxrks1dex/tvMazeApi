'use client'
import {useSearchParams} from "next/navigation";
import useTvShows from "@/hooks/fetch/fetch";
import {styled} from "styled-components";
import StarRating from "@/components/StarRating";
import LanguageSwitcher from "@/utilits/Translations";

const FilmInfo = styled.section`
  display: grid;
  grid-template-columns: 0.3fr 1fr; /*0.4fr*/

  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
`

const RightSideFilmInfo = styled.div`
  display: grid;
  grid-gap: 10px;
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

  color: white;
  
  margin-top: 10px;
  
  width: 210px;
`

const TextStyle = styled.span`
  color: white;
  position: relative;

  line-height: 1.2;

  font-size: 20px;
  
  margin-top: 30px;
`

const StatusContainer = styled.div `
    display: flex;
`

const Genre = styled.div`
  display: grid;
  width: 210px;
  
  background-color: #522546;
  box-shadow: 0px 4px 8px rgba(74, 35, 68, 0.7);
  
  margin-top: 10px;

  border-radius: 5px;
  cursor: pointer;

  font-size: 17px;
  
  &:hover {
    transition: 0.4s;
    color: #c59f97;
    border: 0.1px solid #c59f97;

    font-size: 20px;
  }
`

const FilmPage = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get('id');

    const { data } = useTvShows({id})

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
                        <TextStyle><StatusContainer>Status:<LanguageSwitcher status={data?.status}/></StatusContainer></TextStyle>
                    </div>
                </RightSideFilmInfo>
                <TextStyle>Genres: {data?.genres.map((item: string) => <Genre key={item}>{item}</Genre>)}</TextStyle>
            </FilmInfo>
            {/*<p>{JSON.stringify(data)}</p>*/}
        </>
    );
};

export default FilmPage;