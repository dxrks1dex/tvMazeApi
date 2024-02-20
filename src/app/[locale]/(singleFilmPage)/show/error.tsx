"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import errorPic from "@/pic/errorPic.png";

const ErrorContainerStyled = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  height: 100vh;

  color: #8ba0b2;
`;

const ErrorButton = styled.div`
  text-align: center;

  background-color: #151f2e;

  box-shadow: 0px 5px 5px #151f2e;

  margin-top: 10px;
  border-radius: 5px;

  cursor: pointer;

  font-size: 17px;

  width: 200px;

  &:hover {
    transition: 0.4s;
    color: #3480ea;
    border: 0.1px solid #3480ea;
    font-size: 20px;
  }
`;

const ErrorPicture = styled.img`
  width: 400px;
  height: 400px;

  border-radius: 5px;

  border: 2px solid #c83f3d;
`;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { back } = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);
  console.log(errorPic);
  return (
    <ErrorContainerStyled>
      <ErrorPicture src={`${errorPic.src}`} alt={"no img"} />
      <h2 style={{ color: "white" }}>Oops. Something went wrong!</h2>
      <ErrorButton onClick={() => reset()}>Try again</ErrorButton>
      <ErrorButton onClick={() => back()}>Back</ErrorButton>
    </ErrorContainerStyled>
  );
}
