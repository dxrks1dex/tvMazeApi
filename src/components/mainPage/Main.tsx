"use client";
import { styled } from "styled-components";
import Link from "next/link";
import { useSearchContext } from "@/hooks/context/useSearchContext";
import { ChangeEvent } from "react";
import { StyledInputComponent } from "@/components/styleComponents/InputStyle";
import { useLocale } from "next-intl";

const InputGroup = styled.div`
  display: flex;
  align-items: center;
`;

const InputStyled = styled(StyledInputComponent)`
  &:hover {
    transition: 0.4s;
    border: 0.1px solid #3480ea;
  }
`;

const ButtonStyled = styled.button`
  border-radius: 5px;
  height: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 10px;
  width: 100%;

  cursor: pointer;

  background-color: white;

  &:hover {
    transition: 0.4s;
    color: #3480ea;
    border: 0.1px solid #3480ea;

    font-size: 20px;
    width: 100%;
  }
`;

const MainStyled = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  margin: 0;
`;

export function MainPage() {
  const {
    data: { searchByName },
    operations: { setSearchByName, setCurrentPage },
  } = useSearchContext();

  const locale = useLocale();

  const onNameFound = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchByName(event.target.value);
    setCurrentPage(0);
  };

  return (
    <MainStyled>
      <InputGroup>
        <InputStyled onChange={onNameFound} value={searchByName} />
        <Link
          href={{
            pathname: `/${locale}/films/q=${searchByName}`,
          }}
          locale={"en"}
        >
          <ButtonStyled>Search</ButtonStyled>
        </Link>
      </InputGroup>
    </MainStyled>
  );
}
