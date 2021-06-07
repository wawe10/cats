import {createContext, useContext} from "react";

export const BASE_URL = "https://api.thecatapi.com/v1";

export interface API {
    get: (params: string) => any;
    post: (params: string) => any;
}

const RequestApi = createContext<API>({
    get: (value) => null,
    post: (value) => null,
});

export default RequestApi;

export const useRequestApi = (): API => useContext(RequestApi);
