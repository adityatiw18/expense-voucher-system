import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function NavigationGuard() {
    const { user, logout } = useAuth();

    useEffect(() => {
        if (!user) return;

        window.history.pushState(null, "", window.location.href);

        const handlePopState = () => {
            const shouldExit = window.confirm(
                "Are you sure you want to leave the Expense Voucher System?"
            );

            if (shouldExit) {
                logout();
                window.location.href = "/login";
            } else {
                window.history.pushState(null, "", window.location.href);
            }
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [user, logout]);

    return null;
}

export default NavigationGuard;