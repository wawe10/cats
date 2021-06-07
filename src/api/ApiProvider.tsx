import React from "react";
import RequestApi, {BASE_URL} from "./useAPI";
import axios from "axios";

interface ApiProviderProps {
    children: JSX.Element | Array<JSX.Element>;
}

export default function ApiProvider({children}: ApiProviderProps): JSX.Element {
    const get = async (params: string) => {
        const response = await axios
            .get(`${BASE_URL}${params}`)
            .then((result) => {
                return {
                    data: result.data,
                    count: result.data.length,
                };
            })
            .catch((error) => {
                // @ts-ignore
                console.log(error);

                return {
                    data: [],
                    count: 0,
                };
            });

        return response;
    };

    const post = async (params: string) => {
        const response = await axios.post(`${BASE_URL}${params}`);
    };

    return (
        <RequestApi.Provider value={{get, post}}>
            {children}
        </RequestApi.Provider>
    );
}
