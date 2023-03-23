// import axios from "axios";

// import React from 'react'

// export default function PlanServices() {
//     const [plans, setPlans] = useState([]);
//     const [subs, setSubs] = useState([]);

//     const [pName, setpName] = useState("");
//     const [pPrice, setpPrice] = useState("");
//     const [pDiscount, setpDiscount] = useState("");



//     const [isDisabled, setisDisabled] = useState(true);


//     //function to load all the data
//     const loadPlans = async () => {
//         const plResult = await axios.get("http://localhost:8080/api/v1/user/getUsers");
//         setPlans(plResult.data);
//     }


//     //function to load data to the dropdown
//     const fetchPlan = async (planId) => {
//         setisDisabled(false);

//         const pidResult = await axios.get(`http://localhost:8080/api/v1/user/getUserById/${planId}`);
//         // setSubs(pidResult)

//         setpName(pidResult.data.name);
//         setpPrice(pidResult.data.price);
//         setpDiscount(pidResult.data.discount);
//     }


//     // function to load data to the data grid
//     const loadSubs = async () => {
//         const subResult = await axios.get("http://localhost:8080/api/v1/user/getUsers");
//         setRows(subResult.data);
//         console.log(subResult.data);
//     }


//     return {loadPlans,fetchPlan,loadSubs};
// }




