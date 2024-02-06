'use client'
import {styled} from "styled-components";
import Link from "next/link";
import {useSearchContext} from "@/hooks/searchContext";
import {ChangeEvent} from "react";
import {device, StyledInputComponent} from "@/components/styleComponents/InputStyle";

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
                    pathname: `/films/q=${searchByName}`
                }}>
                    <ButtonStyle>Search</ButtonStyle>
                </Link>
            </InputGroup>
        </MainStyle>
    );
}


const InputGroup = styled.div`
  display: flex;
  align-items: center;
`;

const InputStyle = styled(StyledInputComponent)`
  width: 50rem;
`;

const ButtonStyle = styled.button`
  border-radius: 5px;
  height: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 10px;
  width: 70px;

  background-color: white;
`;

const MainStyle = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  margin: 0;
`;
