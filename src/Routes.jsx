import { Route, Routes } from "react-router-dom";
import FeatureContainer from "./Components/FeatureContainer";
import DetailMarket from "./Features/DetailMarket.jsx";
import DetailStockExchange from "./Features/DetailStockExchange.jsx";
import Index from "./Features/Index.jsx";
import Markets from "./Features/Markets.jsx";
import NotFound from "./Features/NotFound.jsx";
import StockExchange from "./Features/StockExchanges.jsx";

export const routesToDisplay = [
    { path: "/", element: <Index />, name: "Index" },
    { path: "/markets", element: <Markets />, name: "Markets" },
    { path: "/detailMarket", element: <DetailMarket />, name: "DetailMarket" },
    {
        path: "/stocks-exchanges",
        element: <StockExchange />,
        name: "StockExchange",
    },
    {
        path: "/detailStockExchange",
        element: <DetailStockExchange />,
        name: "DetailStockExchange",
    },
];

export const routesNotDisplayed = [
    // { path: "/api/post/:id", element: <PostDetails />, name: "PostDetails" },
    { path: "*", element: <NotFound /> },
];

export default function AppRoutes() {
    return (
        <FeatureContainer>
            <Routes>
                {routesToDisplay.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}

                {routesNotDisplayed.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Routes>
        </FeatureContainer>
    );
}
