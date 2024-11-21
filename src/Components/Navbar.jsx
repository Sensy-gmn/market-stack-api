import { Link } from "react-router-dom";
import { routesToDisplay } from "../Routes";
import DarkModeBtn from "./Redux/DarkModeBtn";

export default function Navbar() {
    return (
        <nav className="bg-background-menu ">
            <ul className="flex gap-4 justify-center text-lg">
                {routesToDisplay.map((route) => (
                    <li key={route.path}>
                        <Link to={route.path}>{route.name}</Link>
                    </li>
                ))}
                <DarkModeBtn />
            </ul>
        </nav>
    );
}
