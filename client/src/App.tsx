import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuthenticated from "./hooks/useAuthenticated";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Layout from "./pages/Layout";

function App() {
    const authenticated = useAuthenticated();

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/profile" element={authenticated ? <Profile /> : <Home />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
