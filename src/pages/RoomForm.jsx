import React from "react";
import { Formik, Field, Form } from "formik";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";

export default function RoomForm({ editMode }) {
  const nav = useNavigate();
  const qc = useQueryClient();
  const { id } = useParams();

  const { data: room } = useQuery(
    ["room", id],
    async () => {
      if (!editMode || !id) return null;
      const { data } = await api.get(`/rooms/${id}`);
      return data;
    },
    { enabled: !!editMode }
  );

  const save = useMutation(
    async (vals) => {
      if (editMode) {
        await api.put(`/rooms/${id}`, vals);
      } else {
        await api.post("/rooms", vals);
      }
    },
    { onSuccess: () => qc.invalidateQueries("rooms") }
  );

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        {editMode ? "Edit Room" : "Add Room"}
      </h2>
      <Formik
        enableReinitialize
        initialValues={{
          name: room?.name || "",
          description: room?.description || "",
          price: room?.price || 0,
        }}
        onSubmit={async (values) => {
          await save.mutateAsync(values);
          nav("/");
        }}
      >
        <Form className="flex flex-col gap-3">
          <label className="flex flex-col">
            <span>Name</span>
            <Field name="name" className="border p-2 rounded" />
          </label>
          <label className="flex flex-col">
            <span>Description</span>
            <Field name="description" className="border p-2 rounded" />
          </label>
          <label className="flex flex-col">
            <span>Price</span>
            <Field name="price" type="number" className="border p-2 rounded" />
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => nav("/")}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
