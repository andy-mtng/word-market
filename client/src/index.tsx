import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import { UserContextProvider } from "./contexts/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <UserContextProvider>
            <NotificationContextProvider>
                <App />
            </NotificationContextProvider>
        </UserContextProvider>
    </React.StrictMode>
);
