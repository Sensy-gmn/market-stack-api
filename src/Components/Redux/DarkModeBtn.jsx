import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../App/slices/UI/UiSlice";

export default function DarkMode() {
    const dispatch = useDispatch();

    //Récupération pour affichage conditionnel
    const isLight = useSelector((state) => state.Ui.isLightMode);

    const handleToggle = () => {
        dispatch(toggleDarkMode(!isLight));
    };

    return (
        <button onClick={handleToggle} className="ml-20 rounded-lg">
            {isLight ? <FaMoon /> : <FaSun />}
        </button>
    );
}
