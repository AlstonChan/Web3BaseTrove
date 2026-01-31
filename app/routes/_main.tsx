import { Outlet, useNavigation } from "react-router";
import { useEffect, useRef, useState } from "react";

import { NotificationProvider } from "~/context/NotificationContext";
import NavHeader from "~/components/NavHeader";
import Footer from "~/components/Footer";
import LoadingPage from "~/components/LoadingPage";
import { Toaster } from "~/components/ui/toaster";

export default function RootMain() {
  const navigation = useNavigation();
  const [showLoading, setShowLoading] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const isNavigating = navigation.state === "loading";

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (isNavigating) {
      // Start a new timeout when navigation begins
      timeoutRef.current = window.setTimeout(() => {
        setShowLoading(true);
        timeoutRef.current = null;
      }, 400);
    } else {
      // Navigation finished, hide loading immediately
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowLoading(false);
    }

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isNavigating]);

  return (
    <NotificationProvider>
      <div className="flex h-full min-h-dvh flex-1 flex-col p-2 sm:p-4">
        <NavHeader />
        {showLoading ? <LoadingPage /> : <Outlet />}
        <Footer />
        <Toaster />
      </div>
    </NotificationProvider>
  );
}
