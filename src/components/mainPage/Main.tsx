'use client'
import {styled} from "styled-components";
import Link from "next/link";
import {useSearchContext} from "@/hooks/searchContext";
import {ChangeEvent} from "react";
import {StyledInputComponent} from "@/components/styleComponents/InputStyle";
import {device} from "@/components/styleComponents/sizes";

const InputGroup = styled.div`
  display: flex;
  align-items: center;
`;

const InputStyle = styled(StyledInputComponent)`

  &:hover {
    transition: 0.4s;
    border: 0.1px solid #c59f97;
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
    color: #c59f97;
    border: 0.1px solid #c59f97;

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
    const {data: {searchByName}, operations: {setSearchByName}} = useSearchContext()

    const onNameFound = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchByName(event.target.value);
    };

    return (
        <MainStyle>
            <InputGroup>
                <InputStyle onChange={onNameFound} value={searchByName}/>
                <Link href={{
                    pathname: `/en/films/q=${searchByName}`
                }} locale={'en'}>
                    <ButtonStyle>Search</ButtonStyle>
                </Link>
            </InputGroup>
        </MainStyle>
    );
}
