import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../app/store";

interface Room {
  _id: string;
  name: string;
  description: string;
  price: number;
}

async function fetchRooms(): Promise<Room[]> {
  const { data } = await api.get<Room[]>("/rooms");
  return data;
}

const Rooms: React.FC = () => {
  const { t } = useTranslation();
  const { data: rooms, isLoading } = useQuery<Room[]>("rooms", fetchRooms);
  const auth = useSelector((state: RootState) => state.auth);
  const qc = useQueryClient();

  const del = useMutation(
    async (id: string) => {
      await api.delete(`/rooms/${id}`);
    },
    { onSuccess: () => qc.invalidateQueries("rooms") }
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t("rooms")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms?.map((room) => (
          <div key={room._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">{room.name}</h2>
            <p>{room.description}</p>
            <p className="font-bold mt-2">${room.price}/night</p>
            <div className="mt-3 flex gap-2">
              {auth.token ? (
                <Link
                  to={`/`}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  {t("book")}
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  {t("login")}
                </Link>
              )}

              {auth.user?.role === "admin" && (
                <>
                  <Link
                    to={`/admin/rooms/${room._id}/edit`}
                    className="px-3 py-1 border rounded"
                  >
                    {t("edit")}
                  </Link>
                  <button
                    onClick={() => del.mutate(room._id)}
                    className="px-3 py-1 border rounded text-red-600"
                  >
                    {t("delete")}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
