import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = "http://localhost:3000/students";

export default function StudentForm({ fetchStudents }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    gender: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`${API}/${id}`)
        .then((res) => res.json())
        .then((data) => setForm(data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    fetchStudents();
    navigate("/");
  };

  const labels = {
    name: "Nama",
    gender: "Gender",
    email: "Email",
    address: "Alamat",
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-semibold text-purple-700 text-center mb-6">
        {id ? "Edit Customers" : "Tambah Customers"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nama */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            {labels.name}
          </label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            {labels.gender}
          </label>
          <select
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            required
          >
            <option value="">-- Pilih Gender --</option>
            <option value="Perempuan">Perempuan</option>
            <option value="Laki-laki">Laki-laki</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            {labels.email}
          </label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        {/* Alamat */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            {labels.address}
          </label>
          <textarea
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            rows={3}
            required
          />
        </div>

        {/* Tombol */}
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            {id ? "Update" : "Tambah"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
