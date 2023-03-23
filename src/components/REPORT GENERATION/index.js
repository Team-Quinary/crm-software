import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));




root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();






// import React from "react";
// import { createRoot } from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
//   Outlet,
// } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import "./App.css";
// import Home from "./routes/Home";
// import Subjects from "./routes/Subjects";
// import Questions from "./routes/Questions";
// import Plans from "./routes/Plans";
// import Settings from "./routes/Settings";
// import ErrorPage from "./routes/ErrorPage";

// const AppLayout = () => {
//   return (
//     <>
//       <Navbar />
//       <Outlet />
//     </>
//   );
// };

// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "subjects",
//         element: <Subjects />,
//       },
//       {
//         path: "questions",
//         element: <Questions />,
//       },
//       {
//         path: "plans",
//         element: <Plans />,
//       },
//       {
//         path: "settings",
//         element: <Settings />,
//       },
//     ],
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );
