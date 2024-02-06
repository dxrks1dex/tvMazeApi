import React, {useEffect, useRef, useState} from "react";
import {styled} from "styled-components";
import Link from "next/link";
import {isElementAtBottomOfPage} from "@/utilits/dom/isElementAtBottomOfPage";
import {isElementOutOfPage} from "@/utilits/dom/isElementOutOfPage";

const FilmComponentStyle = styled.section`
  height: 315px;
  width: 185px;

  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    transition: 0.4s;
  }
`
const FilmImage = styled.img`
  border-radius: 5px;
  width: 185px;
  height: 265px;
`
const FilmName = styled.span`
  font-size: 15px;
  font-weight: 500;
  line-height: 10px;

  margin-top: 10px;

  cursor: pointer;
`

const StyledLink = styled(Link)`
  text-decoration: none;

  color: white;

  &:hover {
    transition: 0.4s;
    color: black;
    text-shadow: 0 0 5px #ffff, 0 0 5px #ffff;
  }
`

const Tooltip = styled.div`
  margin-top: -282px;
  //margin-left: 200px;

  max-width: 200px;

  position: absolute;

  background-color: rgba(255, 255, 255, 0.9);

  border-radius: 5px;

  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  word-wrap: break-word;
  z-index: 999;
`;

export function CardContainer<T extends {
    _links: { self: { href: string } },
    image: { original: string },
    name: string,
    id: number,
    summary: string
}>(item: T): JSX.Element {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const [isElementOut, setIsElementOut] = useState(false)
    const tooltipRef = useRef(null);

    useEffect(() => {
        setIsElementOut(isElementOutOfPage({elementRef: tooltipRef, isTooltipVisible}))
    }, [isTooltipVisible]);

    const handleMouseEnter = () => {
        setTooltipVisible(true);
    };

    const handleMouseLeave = () => {
        setTooltipVisible(false);
    };

    return (
        <FilmComponentStyle>
            <div onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
                <StyledLink href={`/show?id=${item?.id}`}>
                    <FilmImage
                        src={item?.image?.original ?? 'https://i.pinimg.com/736x/6a/6d/11/6a6d1124cf69e5588588bc7e397598f6.jpg'}
                        alt="No image"/>
                    <FilmName>{item?.name}</FilmName>
                </StyledLink>
                {isTooltipVisible && (
                    <Tooltip ref={tooltipRef} style={
                        isElementOut
                            ? {marginLeft: '-215px'}
                            : {marginLeft: '200px'}
                    }>
                        <div dangerouslySetInnerHTML={{
                            __html: item.summary ?? "",
                        }}/>
                    </Tooltip>
                )}

            </div>
        </FilmComponentStyle>
    );
}