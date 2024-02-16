import React, {useEffect, useRef, useState} from "react";
import {styled} from "styled-components";
import Link from "next/link";
import {isElementAtBottomOfPage} from "@/utilits/dom/isElementAtBottomOfPage";
import {isElementOutOfPage} from "@/utilits/dom/isElementOutOfPage";
import {device} from "@/components/styleComponents/sizes";

const FilmComponentStyle = styled.section`
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media ${device.mobileS} {
    height: 171px;
    width: 88px;
  }
  
  @media ${device.mobileM} {
    height: 171px;
    width: 88px;
  }
  
  @media ${device.mobileL} {
    height: 211px;
    width: 121px;
  }
  
  @media ${device.tablet} {
    height: 211px;
    width: 121px;
  }
  
  @media ${device.laptopM} {
    height: 290px;
    width: 185px;
  }
  
  @media ${device.laptopL} {
    height: 290px;
    width: 185px;
  }
  
  @media ${device.desktop} {
    height: 319px;
    width: 204px;
  }
`
const FilmImage = styled.img`
  border-radius: 5px;

  @media ${device.mobileS} {
    width: 88px;
    height: 127px;
  }

  @media ${device.mobileM} {
    width: 88px;
    height: 127px;
  }
  
  @media ${device.mobileL} {
    width: 121px;
    height: 174px;
  }
  
  @media ${device.tablet} {
    width: 121px;
    height: 174px;
  }

  @media ${device.laptopM} {
    width: 167px;
    height: 239px;
  }
  
  @media ${device.laptopL} {
    width: 185px;
    height: 265px;
  }

  @media ${device.desktop} {
    width: 224px;
    height: 321px;
  }
`
const FilmName = styled.span`
  
  @media ${device.mobileL} {
    font-size: 14px;
    font-weight: 500;
  }
  
  @media ${device.tablet} {
    font-size: 15px;
    font-weight: 500;
  }
  
  line-height: 10px;
  
  margin-top: 10px;

  cursor: pointer;
`

const StyledLink = styled(Link)`
  text-decoration: none;

  color: #8ba0b2;

  &:hover {
    transition: 0.4s;
    color: #3480ea;
  }
`

const Tooltip = styled.div`
  margin-top: -282px;

  max-width: 200px;

  position: absolute;

  background-color: rgba(255, 255, 255, 0.9);

  border-radius: 5px;

  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  word-wrap: break-word;
  z-index: 999;
`;

type itemType = {
    _links: { self: { href: string } },
    image: { original: string },
    name: string,
    id: number,
    summary: string
}

export function CardContainer(item: itemType): JSX.Element {
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
                <StyledLink href={`/en/show?id=${item?.id}`} locale={'en'}>
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