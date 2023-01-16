import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    
    url = "https://localhost:7289/api/" + url;

    useEffect(() => {
        fetch(url)
            .then(res => {
                if(res.ok)
                    return res.json();
            })
            .then(data => {
                setData(data);
            })
    }, [url])

    return { data };
}

export default useFetch;