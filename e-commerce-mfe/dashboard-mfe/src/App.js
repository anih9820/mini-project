import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthGuard from "./services/AuthGuard";
import SellerDashboard from "./pages/dashboard/SellerDashboard";
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard ";

function App() {
    return (
        <Router basename="/dashboard">
            <Routes>
                <Route path="/" element={<SellerDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </Router>
        // <AuthGuard><SellerDashboard /></AuthGuard>

    );
}

export default App;