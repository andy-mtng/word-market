import { Link } from "react-router-dom";

function Navbar(): JSX.Element {
    return (
        <nav className="flex items-center justify-between px-12 py-6">
            <Link to="/">
                <div className="flex items-center gap-3">
                    <div className="font-merriweather flex h-9 w-9 items-center justify-center rounded-md bg-green-700 text-2xl font-bold text-white">
                        W
                    </div>
                    <h1 className="text-2xl font-bold">WordMarket</h1>
                </div>
            </Link>
            <ul className="flex gap-4 text-lg font-medium">
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
