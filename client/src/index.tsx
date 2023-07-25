import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@smastrom/react-rating/style.css";
import App from "./App";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import { ProfilePictureContextProvider } from "./contexts/ProfileImageContext";
import { UserContextProvider } from "./contexts/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <UserContextProvider>
            <NotificationContextProvider>
                <ProfilePictureContextProvider>
                    <App />
                </ProfilePictureContextProvider>
            </NotificationContextProvider>
        </UserContextProvider>
    </React.StrictMode>
);
