"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      toast.success("Login successful!");
      router.push("/admin/orders");
    } else {
      toast.error(data.error || "Login failed");
    }
  };

  return (
    <main className="py-20 px-4 bg-gradient-to-br from-yellow-50 to-red-50 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-sm space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-red-600 mb-4">
          Admin Login
        </h1>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:bg-gray-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
