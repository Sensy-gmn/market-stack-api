import { Link } from "react-router-dom";
import { routesToDisplay } from "../Routes";
import DarkModeBtn from "./DarkModeBtn";

export default function Navbar() {
    return (
        <nav>
            <ul className="flex gap-4 justify-center text-2xl">
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
