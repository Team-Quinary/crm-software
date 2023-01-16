import { useState } from "react";

const GetData = (url) => {
    const [data, setData] = useState([]);

    url = "https://localhost:7289/api/" + url;

    fetch(url)
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((data) => {
            setData(data);
        });

    return { data };
};

export default GetData;
