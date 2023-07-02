import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NotificationContextProvider } from "./contexts/NotificationContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <NotificationContextProvider>
            <App />
        </NotificationContextProvider>
    </React.StrictMode>
);
