import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSymbolPrompt } from "../App/slices/FinancialData/SymbolPrompt";

export default function Markets() {
    const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
    const [marketList, setMarketList] = useState([]);
    const [category, setCategory] = useState("stocks");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchListedStocks = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `https://www.alphavantage.co/query`,
                {
                    params: {
                        function: "LISTING_STATUS",
                        apikey: ALPHA_VANTAGE_API_KEY,
                        datatype: "csv",
                    },
                    responseType: "text",
                }
            );

            if (!response.data) {
                throw new Error("No data received");
            }

            const rows = response.data.split("\n");
            return rows
                .slice(1)
                .map((row) => {
                    const [symbol, name, exchange, assetType, ipoDate] =
                        row.split(",");
                    return {
                        symbol: symbol?.trim(),
                        name: name?.trim(),
                        exchange: exchange?.trim(),
                        assetType: assetType?.trim(),
                        ipoDate: ipoDate?.trim(),
                    };
                })
                .filter((item) => item.symbol && item.name);
        } catch (error) {
            console.error("Error fetching stocks:", error);
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    const fetchForexList = async () => {
        // Liste forex demo (Rate limit)
        const commonPairs = [
            { symbol: "EUR/USD", name: "Euro/US Dollar" },
            { symbol: "GBP/USD", name: "British Pound/US Dollar" },
            { symbol: "USD/JPY", name: "US Dollar/Japanese Yen" },
            { symbol: "USD/CHF", name: "US Dollar/Swiss Franc" },
            { symbol: "USD/CAD", name: "US Dollar/Canadian Dollar" },
            { symbol: "AUD/USD", name: "Australian Dollar/US Dollar" },
            { symbol: "NZD/USD", name: "New Zealand Dollar/US Dollar" },
        ];
        return commonPairs.map((pair) => ({
            ...pair,
            assetType: "forex",
        }));
    };

    const handleSetSymbol = (symbol) => {
        dispatch(setSymbolPrompt(symbol));
    };

    useEffect(() => {
        const loadMarketList = async () => {
            setIsLoading(true);
            try {
                let data = [];
                category === "stocks"
                    ? (data = await fetchListedStocks())
                    : (data = await fetchForexList());
                setMarketList(data);
            } catch (error) {
                console.error("Error loading market list:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadMarketList();
    }, [category]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Markets</h1>

            {/* Sélecteur de catégorie */}
            <div className="mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choisir une catégorie d&apos;actif
                </p>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
                >
                    <option value="stocks">Stocks</option>
                    <option value="forex">Forex</option>
                </select>
            </div>

            {isLoading && (
                <div className="text-center py-4 dark:text-white">
                    Loading...
                </div>
            )}

            {/* Liste des marchés */}
            {!isLoading && marketList.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {marketList.map((item, index) => (
                        <div
                            onClick={() => {
                                handleSetSymbol(item.symbol);
                            }}
                            key={index}
                            className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        >
                            <div className="font-bold">{item.symbol}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                                {item.name}
                            </div>
                            {item.exchange && (
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {item.exchange}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && marketList.length === 0 && (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    API rate limit :( <br />
                    <code className="text-xs">
                        Réessayez d&apos;ici quelques minutes !
                    </code>
                </div>
            )}
        </div>
    );
}
