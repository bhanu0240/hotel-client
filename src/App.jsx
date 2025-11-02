import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Rooms from "./pages/Rooms";
import RoomForm from "./pages/RoomForm";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Rooms />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/rooms/new"
            element={
              <ProtectedRoute adminOnly>
                <RoomForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/rooms/:id/edit"
            element={
              <ProtectedRoute adminOnly>
                <RoomForm editMode />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
