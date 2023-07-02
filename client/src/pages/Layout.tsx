import React from "react";
import Navbar from "../components/Navbar";
import useNotificationContext from "../hooks/useNotificationContext";

interface LayoutProps {
    children: React.ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
    const { showNotification, Notification } = useNotificationContext();

    return (
        <>
            {showNotification && <Notification />}
            <Navbar />
            <main className="px-12">{children}</main>
        </>
    );
}

export default Layout;
