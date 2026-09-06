import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import NavigationGuard from "./components/NavigationGuard";

import EmployeeDashboard from "./pages/employee/Dashboard";
import MyVouchers from "./pages/employee/MyVouchers";
import CreateVoucher from "./pages/employee/CreateVoucher";
import VoucherDetails from "./pages/employee/VoucherDetails";
import EditVoucher from "./pages/employee/EditVoucher";

import DirectorDashboard from "./pages/director/Dashboard";
import PendingApprovals from "./pages/director/PendingApprovals";
import DirectorVoucherDetails from "./pages/director/VoucherDetails";
import DirectorAllVouchers from "./pages/director/AllVouchers";

import AccountsDashboard from "./pages/accounts/Dashboard";
import AllVouchers from "./pages/accounts/AllVouchers";
import AccountsVoucherDetails from "./pages/accounts/VoucherDetails";


import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
        <NavigationGuard />
            <Routes>
            

                <Route path="/login" element={<Login />} />

                <Route
                    path="/employee"
                    element={
                        <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                            <EmployeeDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employee/vouchers"
                    element={
                        <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                            <MyVouchers />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/employee/vouchers/:id"
                    element={
                        <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                            <VoucherDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/employee/vouchers/:id/edit"
                    element={
                        <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                            <EditVoucher/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/employee/create"
                    element={
                        <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                            <CreateVoucher />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/director"
                    element={
                        <ProtectedRoute allowedRoles={["DIRECTOR"]}>
                            <DirectorDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/director/pending"
                    element={
                        <ProtectedRoute allowedRoles={["DIRECTOR"]}>
                            <PendingApprovals />
                        </ProtectedRoute>
                    }
                />
                <Route
    path="/director/vouchers"
    element={
        <ProtectedRoute allowedRoles={["DIRECTOR"]}>
            <DirectorAllVouchers />
        </ProtectedRoute>
    }
/>
                <Route
                    path="/director/vouchers/:id"
                    element={
                        <ProtectedRoute allowedRoles={["DIRECTOR"]}>
                            <DirectorVoucherDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/accounts"
                    element={
                        <ProtectedRoute allowedRoles={["ACCOUNTS"]}>
                            <AccountsDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/accounts/vouchers"
                    element={
                        <ProtectedRoute allowedRoles={["ACCOUNTS"]}>
                            <AllVouchers />
                        </ProtectedRoute>
                    }
                />
                <Route
    path="/accounts/vouchers/:id"
    element={
        <ProtectedRoute allowedRoles={["ACCOUNTS"]}>
            <AccountsVoucherDetails />
        </ProtectedRoute>
    }
/>
                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;