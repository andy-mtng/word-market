import { createContext, useState, useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiSolidErrorCircle } from "react-icons/bi";

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
            <div className="fixed right-6 top-6 flex items-center gap-2 rounded-sm border border-gray-200 bg-white px-2 py-1 shadow-sm">
                {notificationInfo.type === "success" ? (
                    <AiFillCheckCircle color="green" size={16} />
                ) : (
                    <BiSolidErrorCircle color="red" size={16} />
                )}
                <p>{notificationInfo.message}</p>
                <button onClick={clear}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        );
    }

    const clear = (): void => {
        setShowNotification(false);
        setNotificationInfo({ message: "", type: "" });
    };

    useEffect(() => {
        if (showNotification) {
            setTimeout(() => {
                clear();
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
