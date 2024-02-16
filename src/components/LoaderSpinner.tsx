import { Oval } from "react-loader-spinner";


export const LoaderSpinner = () => {

    return <Oval height="80"
                 width="80"
                 color="blue"
                 secondaryColor="white"
                 wrapperStyle={{justifyContent: "center"}}
                 ariaLabel="oval-loading"
    />
}