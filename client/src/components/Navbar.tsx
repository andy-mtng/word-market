import { Link } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";
function Navbar(): JSX.Element {
    const { user } = useUserContext();

    return (
        <nav className="flex items-center justify-between px-12 py-6">
            <Link to="/">
                <div className="flex items-center gap-2">
                    <div className="font-merriweather flex h-9 w-9 items-center justify-center rounded-md bg-green-800 pt-1 text-2xl font-bold text-white">
                        W
                    </div>
                    <h1 className="text-2xl font-bold">WordMarket</h1>
                </div>
            </Link>
            <ul className="flex items-center gap-4 text-lg font-medium">
                <li>
                    <Link to="/explore">Explore</Link>
                </li>
                <li>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                    </svg>
                </li>
                {user && (
                    <div className="display flex gap-4">
                        <li>
                            <Link to="/profile">
                                <div className="box-border h-10 w-10 rounded-md bg-gray-300"></div>
                            </Link>
                        </li>
                    </div>
                )}
                {!user && (
                    <li>
                        <Link
                            className="rounded-sm bg-green-700 px-6 py-2 text-white shadow-sm"
                            to="/login"
                        >
                            Login
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
