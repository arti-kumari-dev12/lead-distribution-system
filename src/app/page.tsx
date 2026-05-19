"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    service: "Service 1",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/create-lead", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(form),
    });

    const data = await res.json();

    setMessage(data.message || data.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold">
          Lead System
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Phone"
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="City"
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              city: e.target.value,
            })
          }
        />

        <select
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              service: e.target.value,
            })
          }
        >
          <option>Service 1</option>
          <option>Service 2</option>
          <option>Service 3</option>
        </select>

        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <button className="w-full bg-black text-white p-3 rounded">
          Submit Lead
        </button>

        {message && (
          <p className="text-center">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}