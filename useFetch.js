import { useEffect } from "react";
import { useState } from "react";

const localCache = {

}

export const useFetch = (url) => {
    const [state, setState] = useState({
        data:null,
        isLoading: true,
        hasError: false,
        error: null,
    });

    useEffect(()=>{
        getFetch();
    }, [url]);
    
    const seLoadingState =() => {
        setState({
            data:null,
            isLoading: true,
            hasError: false,
            error: null,
        });
    }

    const getFetch = async()=>{

        if(localCache[url]){ // uso los elementos de la cache 
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null
            })
            return;
        }

        seLoadingState();

        const resp = await fetch(url);
        if(!resp.ok){
            setState({
                data:null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText,
                },
            });
            return;
        }
        const data = await resp.json();
        // console.log(data);
        setState({
            data:data,
            isLoading: false,
            hasError: false,
            error: null,
        });
        // manejo de cache
        localCache[url]=data;
    }

    return {
        data:state.data,
        isLoading: state.isLoading,
        hasError: state.hasError
    };
}