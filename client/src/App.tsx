import { BrowserRouter, Route, Routes } from "react-router-dom";
import useUserContext from "./hooks/useUserContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Layout from "./pages/Layout";
import BookPage from "./pages/BookPage";
import CartPage from "./pages/CartPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import Error from "./pages/Error";

function App() {
    const { user } = useUserContext();

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={user ? <Home /> : <Login />} />
                    <Route path="/signup" element={user ? <Home /> : <Signup />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/books/:id" element={<BookPage />} />
                    <Route path="/profile" element={user ? <Profile /> : <Login />} />
                    <Route path="/cart" element={user ? <CartPage /> : <Login />} />
                    <Route
                        path="/order-confirmation"
                        element={user ? <OrderConfirmation /> : <Login />}
                    />
                    <Route path="*" element={Error} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
