import { Link } from "react-router-dom";
// import DefaultPfp from "../assets/default_pfp.png";

function Navbar(): JSX.Element {
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
                    <Link to="/profile">
                        <div className="box-border h-10 w-10 rounded-md bg-gray-300"></div>
                    </Link>
                </li>
                <li>
                    <Link
                        className="rounded-sm bg-green-700 px-6 py-2 text-white shadow-sm"
                        to="/login"
                    >
                        Login
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
