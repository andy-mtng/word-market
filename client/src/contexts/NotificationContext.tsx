import { createContext, useState, useEffect } from "react";

interface NotificationContextProviderProps {
    children: React.ReactNode;
}

interface NotificationInfo {
    message: string;
    type: string;
}

interface Notification {
    showNotification: boolean;
    setShowNotification: (showNotification: boolean) => void;
    setNotificationInfo: (notificationInfo: NotificationInfo) => void;
    Notification: React.FC;
}

const NotificationContext = createContext<Notification>({
    showNotification: false,
    setShowNotification: () => {},
    setNotificationInfo: () => {},
    Notification: () => null
});

const NotificationContextProvider = ({ children }: NotificationContextProviderProps) => {
    const [notificationInfo, setNotificationInfo] = useState({ message: "", type: "" });
    const [showNotification, setShowNotification] = useState(false);

    function Notification(): JSX.Element {
        return (
            <div>
                <p>{notificationInfo.type}</p>
                <p>{notificationInfo.message}</p>
            </div>
        );
    }

    useEffect(() => {
        if (showNotification) {
            setTimeout(() => {
                setShowNotification(false);
                setNotificationInfo({ message: "", type: "" });
            }, 5000);
        }
    }, [showNotification]);

    return (
        <NotificationContext.Provider
            value={{ showNotification, setShowNotification, setNotificationInfo, Notification }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export { NotificationContextProvider, NotificationContext };
