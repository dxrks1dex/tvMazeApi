import {styled} from "styled-components";
import React from "react";
import {useSearchContext} from "@/hooks/searchContext";

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}
export const device = {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`
}

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
`;