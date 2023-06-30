import React from "react";
import Navbar from "../components/Navbar";

interface LayoutProps {
    children: React.ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
    return (
        <>
            <Navbar />
            <main className="px-12">{children}</main>
        </>
    );
}

export default Layout;
