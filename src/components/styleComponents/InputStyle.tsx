import {styled} from "styled-components";
import React from "react";
import {device} from "@/components/styleComponents/sizes";

interface InputProps {
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class InputComponent extends React.Component<InputProps> {
    render() {
        return <input {...this.props} />;
    }
}

export const StyledInputComponent = styled(InputComponent)`
  
  border-radius: 5px;
  height: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 10px;

    @media ${device.mobileS} {
    width: 10rem;
  }
  
  @media ${device.mobileL} {
    width: 20rem;
  }

  @media ${device.tablet} {
    width: 40rem;
  }

  @media ${device.laptop} {
    width: 50rem;
  }

  @media ${device.laptopL} {
    width: 60rem;
  }

  @media ${device.desktop} {
    width: 70rem;
  }

  @media ${device.desktopL} {
    width: 80rem;
  }
`;