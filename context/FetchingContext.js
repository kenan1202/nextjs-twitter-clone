import { createContext, useState } from 'react';

export const FetchingContext = createContext();


export default function FetchData(props) {
    const [fetchingSsr, setFetchingSsr] = useState(true);

    return (
        <FetchingContext.Provider value = {{fetchingSsr, setFetchingSsr}}>
            {props.children}
        </FetchingContext.Provider>
    )
}