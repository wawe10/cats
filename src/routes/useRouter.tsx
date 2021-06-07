import React, {useCallback, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {stringify, parse} from "querystring";
import {useNavigation} from "./useNavigation";

interface Params {
    [key: string]: string | boolean | number;
}

export interface NavigateParams {
    pathname: string;
    params?: Params;
    stateParams?: object | any;
}

export interface UseNavigationContext {
    navigate: (value: NavigateParams) => void;
    history: History | object;
    pathName: string;
    queryParams: (value: object) => object;
}

export default function useRouter(): UseNavigationContext {
    const history = useHistory();
    const location = useLocation();
    const {setPrivateStateParams} = useNavigation();

    const navigate = useCallback(
        ({pathname, params, stateParams}: NavigateParams) => {
            history.push({
                pathname,
                search: params ? stringify(params) : undefined,
            });

            if (stateParams) {
                setPrivateStateParams(stateParams);
            }
        },
        [history],
    );

    const queryParams = useCallback(
        (defaultQueryParams: object) => {
            return {
                ...defaultQueryParams,
                ...parse(location.search),
            };
        },
        [location.search],
    );

    return {
        navigate,
        history,
        pathName: location.pathname,
        queryParams,
    };
}
