"use client";
import { styled } from "styled-components";
import Link from "next/link";
import { useSearchContext } from "@/hooks/searchContext";
import { ChangeEvent } from "react";
import { StyledInputComponent } from "@/components/styleComponents/InputStyle";

const InputGroup = styled.div`
  display: flex;
  align-items: center;
`;

const InputStyle = styled(StyledInputComponent)`
  &:hover {
    transition: 0.4s;
    border: 0.1px solid #3480ea;
  }
`;

const ButtonStyle = styled.button`
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

const MainStyle = styled.div`
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

  const onNameFound = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchByName(event.target.value);
    setCurrentPage(0);
  };

  return (
    <MainStyle>
      <InputGroup>
        <InputStyle onChange={onNameFound} value={searchByName} />
        <Link
          href={{
            pathname: `/en/films/q=${searchByName}`,
          }}
          locale={"en"}
        >
          <ButtonStyle>Search</ButtonStyle>
        </Link>
      </InputGroup>
    </MainStyle>
  );
}
