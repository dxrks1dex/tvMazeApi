import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const LangContainer = styled.div`
  margin-bottom: 20px;
  margin-left: 10px;
  
  display: flex;
`;

const LanguageButton = styled.div`
  width: 50px;

  text-align: center;

  background-color: #522546;
  box-shadow: 0px 4px 8px rgba(74, 35, 68, 0.7);

  margin-right: 10px;

  border-radius: 5px;
  cursor: pointer;

  font-size: 17px;

  &:hover {
    transition: 0.4s;
    color: #c59f97;
    border: 0.1px solid #c59f97;

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
