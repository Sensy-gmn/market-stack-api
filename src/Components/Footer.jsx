import { useSelector } from "react-redux";

export default function Footer() {
    const isLight = useSelector((state) => state.Ui.isLightMode);

    const bgColor = isLight ? "bg-gray-200" : "bg-gray-800";

    return (
        <footer className={`flex justify-center text-3xl ${bgColor}`}>
            Footer
        </footer>
    );
}
