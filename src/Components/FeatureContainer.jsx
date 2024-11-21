import { useSelector } from "react-redux";
import "../index.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function FeatureContainer({ children }) {
    //Récupération pour affichage conditionnel
    const isLight = useSelector((state) => state.Ui.isLightMode);

    return (
        <div
            className={`flex flex-col min-h-screen bg-background text-foreground ${
                isLight ? "" : "dark"
            }`}
        >
            <Navbar />
            <main className="container mx-auto bg-background">{children}</main>
            <Footer />
        </div>
    );
}
