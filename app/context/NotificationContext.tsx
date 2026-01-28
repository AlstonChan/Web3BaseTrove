import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";

interface NotificationContextType {
  message: string;
  showNotification: (msg: string) => void;
  hideNotification: () => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string>("");

  const showNotification = useCallback((msg: string) => {
    setMessage(msg);
  }, []);

  const hideNotification = useCallback(() => {
    setMessage("");
  }, []);

  return (
    <NotificationContext.Provider value={{ message, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
