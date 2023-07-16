import React from "react";
import Navbar from "../components/Navbar";
import useNotificationContext from "../hooks/useNotificationContext";

interface LayoutProps {
    children: React.ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
    const { showNotification, Notification } = useNotificationContext();

    return (
        <div className="flex min-h-screen flex-col">
            {showNotification && <Notification />}
            <Navbar />
            <main className="flex-grow px-12">{children}</main>
            <footer className="h-20 w-full bg-green-900 px-12 py-6 font-semibold text-white">
                WordMarket
            </footer>
        </div>
    );
}

export default Layout;
