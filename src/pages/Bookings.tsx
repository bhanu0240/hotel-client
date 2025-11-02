import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "../api/axios";

interface Booking {
  _id: string;
  room?: { name: string };
  from: string;
  to: string;
}

async function fetchBookings(): Promise<Booking[]> {
  const { data } = await api.get<Booking[]>("/bookings/my");
  return data;
}

const Bookings: React.FC = () => {
  const qc = useQueryClient();
  const { data: bookings, isLoading } = useQuery<Booking[]>("myBookings", fetchBookings);

  const cancel = useMutation(
    async (id: string) => {
      await api.delete(`/bookings/${id}`);
    },
    { onSuccess: () => qc.invalidateQueries("myBookings") }
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <div className="space-y-4">
        {bookings?.map((b) => (
          <div
            key={b._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">{b.room?.name ?? "Room"}</div>
              <div className="text-sm text-gray-600">
                From: {new Date(b.from).toLocaleDateString()} To:{" "}
                {new Date(b.to).toLocaleDateString()}
              </div>
            </div>
            <div>
              <button
                onClick={() => cancel.mutate(b._id)}
                className="px-3 py-1 border text-red-600 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
