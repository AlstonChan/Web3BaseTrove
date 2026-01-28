// Remix Modules
import { Outlet, useNavigation } from "react-router";

// External Modules
import { useEffect, useRef, useState } from "react";

// Internal Modules
import { NotificationProvider } from "~/context/NotificationContext";

// Components
import NavHeader from "~/components/NavHeader";
import Footer from "~/components/Footer";
import LoadingPage from "~/components/LoadingPage";
import { Toaster } from "~/components/ui/toaster";

export default function _Main() {
  const navigation = useNavigation();

  // Delay the loading state to prevent flickering
  const delay = useRef<number | null>(null);
  // Record the loading state of the navigation
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navigation.state === "loading") {
      delay.current = window.setTimeout(() => {
        if (navigation.state === "loading") {
          setLoading(true);
        }
      }, 400);
    }

    if (navigation.state === "idle") {
      if (delay.current !== null) {
        clearTimeout(delay.current);
        delay.current = null;
      }
      setLoading(false);
    }

    return () => {
      if (delay.current !== null) {
        clearTimeout(delay.current);
        delay.current = null;
      }
    };
  }, [navigation.state]);

  return (
    <NotificationProvider>
      <div className="flex h-full min-h-dvh flex-1 flex-col p-2 sm:p-4">
        <NavHeader />
        {loading ? <LoadingPage /> : <Outlet />}
        <Footer />
        <Toaster />
      </div>
    </NotificationProvider>
  );
}
