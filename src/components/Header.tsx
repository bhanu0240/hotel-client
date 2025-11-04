import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { useTranslation } from "react-i18next";
import type { RootState } from "../app/store";
import type { AppDispatch } from "../app/store";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();

  async function handleLogout() {
    await dispatch(logoutUser());
    nav("/");
  }

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-xl">
            Destination Bir
          </Link>
          <Link to="/">{t("rooms")}</Link>
          {auth.user && <Link to="/bookings">{t("my_bookings")}</Link>}
          {auth.user?.role === "admin" && (
            <Link to="/admin/rooms/new" className="text-blue-600">
              {t("add_room")}
            </Link>
          )}
        </div>
        <div className="flex items-center gap-4">
          <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="en">EN</option>
            <option value="bn">BN</option>
          </select>

          {auth.user ? (
            <>
              <span className="hidden sm:inline">{auth.user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                {t("logout")}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              {t("login")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
