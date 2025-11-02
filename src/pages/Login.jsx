import React from "react";
import { Formik, Field, Form } from "formik";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (vals, { setSubmitting, setErrors }) => {
          try {
            const { data } = await api.post("/auth/login", vals);
            // Expect { token, user }
            dispatch(setCredentials({ user: data.user, token: data.token }));
            nav("/");
          } catch (e) {
            setErrors({ email: "Invalid credentials" });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="flex flex-col gap-3">
          <label className="flex flex-col">
            <span>Email</span>
            <Field name="email" className="border p-2 rounded" />
          </label>
          <label className="flex flex-col">
            <span>Password</span>
            <Field
              name="password"
              type="password"
              className="border p-2 rounded"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
}
