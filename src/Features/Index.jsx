import axios from "axios";
import { createChart } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

const Index = () => {
    const chartContainerRef = useRef(null);
    const isLight = useSelector((state) => state.Ui.isLightMode);
    const [data, setData] = useState([]);
    const symbol = useSelector((state) => state.SymbolPrompt.symbolPrompt);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://www.alphavantage.co/query`,
                {
                    params: {
                        function: "TIME_SERIES_DAILY",
                        symbol: symbol,
                        apikey: ALPHA_VANTAGE_API_KEY,
                        outputsize: "compact",
                    },
                }
            );

            const timeSeriesData = response.data["Time Series (Daily)"];
            if (!timeSeriesData) {
                console.error("No data received from API");
                return [];
            }

            const formattedData = Object.entries(timeSeriesData)
                .map(([date, values]) => ({
                    time: date,
                    open: parseFloat(values["1. open"]),
                    high: parseFloat(values["2. high"]),
                    low: parseFloat(values["3. low"]),
                    close: parseFloat(values["4. close"]),
                }))
                .reverse();

            setData(formattedData);
            return formattedData;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    };

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { color: isLight ? "#ffffff" : "#131722" },
                textColor: isLight ? "#000000" : "#d1d4dc",
            },
            grid: {
                vertLines: { color: isLight ? "#e1e3ea" : "#363c4e" },
                horzLines: { color: isLight ? "#e1e3ea" : "#363c4e" },
            },
            width: chartContainerRef.current.clientWidth,
            height: 500,
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
        });

        const candlestickSeries = chart.addCandlestickSeries({
            upColor: "#26a69a",
            downColor: "#ef5350",
            borderVisible: false,
            wickUpColor: "#26a69a",
            wickDownColor: "#ef5350",
        });

        fetchData().then((formattedData) => {
            if (formattedData.length > 0) {
                candlestickSeries.setData(formattedData);
                chart.timeScale().fitContent();
            }
        });

        const handleResize = () => {
            chart.applyOptions({
                width: chartContainerRef.current.clientWidth,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, [isLight, symbol]);
    console.log(data);

    return (
        <div className="p-4">
            {data.length > 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div
                        ref={chartContainerRef}
                        className="h-[60vh] min-h-[400px]"
                    />
                </div>
            ) : (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    API rate limit :( <br />
                    <code className="text-xs">
                        Réessayez d&apos;ici quelques minutes !
                    </code>
                </div>
            )}
        </div>
    );
};

export default Index;
