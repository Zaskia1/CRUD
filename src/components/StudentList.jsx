import React from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2, Plus, Menu } from "lucide-react";

export default function StudentList({ students, deleteStudent }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-purple-600 text-white flex items-center justify-between px-6 py-4 shadow-md">
        <div className="flex items-center gap-4">
          <Menu size={28} className="cursor-pointer" />
          <h1 className="text-lg font-semibold">Customer</h1>
        </div>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-full border-2 border-white"
        />
      </header>

      {/* Table Container */}
      <main className="p-6 flex justify-center">
        <div className="bg-white shadow-lg rounded-md overflow-hidden w-full max-w-5xl">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-700">
                <th className="p-3 border-b">ID</th>
                <th className="p-3 border-b">Nama</th>
                <th className="p-3 border-b">Address</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Gender</th>
                <th className="p-3 border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr
                  key={s.id}
                  className="hover:bg-gray-50 transition border-b last:border-none"
                >
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.address}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">{s.gender}</td>
                  <td className="p-3 text-center flex justify-center gap-3">
                    <button
                      onClick={() => navigate(`/edit/${s.id}`)}
                      className="text-gray-600 hover:text-yellow-500 transition"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Apakah kamu yakin ingin menghapus ${s.name}?`
                          )
                        ) {
                          deleteStudent(s.id);
                        }
                      }}
                      className="text-gray-600 hover:text-red-500 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate("/add")}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}
