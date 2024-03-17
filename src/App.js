import React, { lazy, Suspense,useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js";
import BodyComp from "./components/Body.js";
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import Error from "./components/Error.js";
import RestaurantMenu from "./components/RestaurantMenu.js";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
//import Grocery from "./components/Grocery.js";
import Shimmer from "./components/shimmer.js";
import UserContext from "./utils/UserContext.js";

const Grocery = lazy(() => import("./components/Grocery.js"));

const AppComp = () => {
    const [userName, setUserName] = useState();
    useEffect(() => {
        const data = {
            name: "Schrodinger",
        };
        setUserName(data.name);
    }, []);
    return (
        <UserContext.Provider value={{loggedInUser:userName, setUserName}}>
        <div>
            <Header />
            <Outlet />
        </div>
        </UserContext.Provider>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppComp />,
        children: [
            {
                path: "/",
                element: <BodyComp />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/grocery",
                element: (
                    <Suspense fallback={<Shimmer />}>
                        <Grocery />
                    </Suspense>
                ),
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu />,
            },
        ],
        errorElement: <Error />,
    },
]);

const heading = React.createElement("h1", { id: "heading" }, "Hey there");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
