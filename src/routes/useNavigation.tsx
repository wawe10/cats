import {useContext, createContext} from "react";

interface Navigation {
    privateStateParams: any;
    setPrivateStateParams: any;
}

const RoutesNavigationParams = createContext<Navigation>({
    privateStateParams: {},
    setPrivateStateParams: () => null,
});

export default RoutesNavigationParams;

export const useNavigation = (): Navigation =>
    useContext(RoutesNavigationParams);
