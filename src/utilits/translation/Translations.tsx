import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {device} from "@/components/styleComponents/sizes";

const LangContainer = styled.div`
  margin-bottom: 20px;
  
  display: flex;

  @media ${device.mobileL} {
    position: absolute;
    
    margin-top: 30px;
    margin-left: 0px;
  }

  @media ${device.tablet} {
    position: unset;
    
    margin-top: 0px;
    margin-left: 10px;
  }
`;

const LanguageButton = styled.div`
  width: 50px;

  text-align: center;

  background-color: #151f2e;
  box-shadow: 0px 5px 5px #151f2e;

  margin-right: 10px;

  border-radius: 5px;
  cursor: pointer;

  font-size: 17px;

  &:hover {
    transition: 0.4s;
    color: #3480ea;
    border: 0.1px solid #3480ea;

    font-size: 20px;
  }
`;

const TranslateStatus = styled.div`
  margin-left: 10px;
`

interface TranslateProps {
    status: string
}
interface Dictionary {
    [key: string]: string;
}

const LanguageSwitcher = ({ status }: TranslateProps) => {
    const [dictionary, setDictionary] = useState<Dictionary>({});
    const [currentLang, setCurrentLang] = useState('en');

    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                const response = await fetch(`../messages/${currentLang}.json`);
                const data = await response.json();
                setDictionary(data.Data);
            } catch (error) {
                console.error('Error loading translations:', error);
            }
        };

        fetchTranslations();
    }, [currentLang]);

    return (
        <>
        <TranslateStatus>{dictionary[status]}</TranslateStatus>
        <LangContainer>
            <LanguageButton onClick={() => setCurrentLang('ru')}>RU</LanguageButton>
            <LanguageButton onClick={() => setCurrentLang('en')}>EN</LanguageButton>
        </LangContainer>
        </>
    );
};

export default LanguageSwitcher;
