import Footer from "./Footer";
import Navbar from "./Navbar";

export default function FeatureContainer({ children }) {
    return (
        <div className="flex flex-col min-h-screen  bg-gray-100">
            <Navbar />
            <main className="container mx-auto">{children}</main>
            <Footer />
        </div>
    );
}
