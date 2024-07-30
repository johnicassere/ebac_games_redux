import { render, RenderOptions } from "@testing-library/react";
import { PreloadedState } from '@reduxjs/toolkit'
import { AppStore, RootState, configurarStore } from "../store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";


interface ExtenderRenderOptions extends Omit<RenderOptions, 'queries'>{
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore
}

export function renderizaComProvaider (
    elemento: React.ReactElement,
    {
        preloadedState = {},
        store = configurarStore(preloadedState),
        ...opcoesAdicionais
    }: ExtenderRenderOptions = {}
){
    function Encapsulador ({ children }: PropsWithChildren <{}>): JSX.Element{
        return ( <Provider store={store}>{children}</Provider>
        )
    }
    return {
        store,
        ...render(elemento, {
            wrapper: Encapsulador,
            ...opcoesAdicionais
        })
    }
}