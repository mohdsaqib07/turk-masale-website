"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useRouter } from "next/navigation";
interface OrderItem {
  title: string;
  size: string;
  quantity: number;
  price: string;
}

interface Order {
  id: number;
  fullName: string;
  phone: string;
  alternatePhone?: string;
  pincode: string;
  city: string;
  landmark?: string;
  fullAddress: string;
  addressType: string;
  orderSummary: string;
  status: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const ordersPerPage = 5;

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders))
      .catch(() => toast.error("Failed to fetch orders"));
  }, []);

  const updateOrderStatus = async (
    orderId: number,
    status: string,
    phone: string
  ) => {
    try {
    
      const res = await fetch("/api/admin/orders/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status, phone }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Order status updated!");
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status } : order
          )
        );
      } else {
        toast.error("Failed to update order status");
      }
    } catch {
      toast.error("Error updating order status");
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      orders.map((order) => ({
        "Order ID": order.id,
        "Full Name": order.fullName,
        Phone: order.phone,
        "Alternate Phone": order.alternatePhone || "N/A",
        Pincode: order.pincode,
        City: order.city,
        Landmark: order.landmark || "N/A",
        "Full Address": order.fullAddress,
        "Address Type": order.addressType,
        "Order Summary": order.orderSummary,
        Status: order.status,
        "Placed On": format(new Date(order.createdAt), "PPPpp"),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(fileData, "TurkMasale-Orders.xlsx");
  };

  const filteredOrders = orders
    .filter((order) => {
      if (statusFilter === "All") return true;
      return order.status === statusFilter;
    })
    .filter(
      (order) =>
        order.id.toString().includes(searchTerm) ||
        order.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <main className="py-20 px-4 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">
        Admin: Orders Management{" "}
      </h1>

      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search by Order ID or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          onClick={exportToExcel}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Download Excel
        </button>
        <button
          onClick={async () => {
            await fetch("/api/admin/logout");
            router.push("/admin/login");
          }}
          className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition "
        >
          Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {currentOrders.length === 0 ? (
          <p className="text-gray-700 text-center">No orders found.</p>
        ) : (
          currentOrders.map((order) => (
            <div
              key={order.id}
              className="bg-[#FDF4EB] p-6 rounded-lg shadow-md space-y-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">
                    Order #{order.id}
                  </h2>
                  <p className="text-gray-600">
                    Placed on: {format(new Date(order.createdAt), "PPPpp")}
                  </p>
                  <p className="text-gray-600">
                    Status:{" "}
                    <strong>
                      {order.status ? order.status : "not appearing"}
                    </strong>
                  </p>
                </div>
                <div className="flex space-x-2">
                  {["Pending", "Completed"].map((status) => (
                    <button
                      key={status}
                      onClick={() =>
                        updateOrderStatus(order.id, status, order.phone)
                      }
                      className={`px-3 py-1 rounded ${
                        order.status === status
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Customer Details:
                </h3>
                <p>👤 {order.fullName}</p>
                <p>
                  📞 {order.phone}{" "}
                  {order.alternatePhone ? ` / ${order.alternatePhone}` : ""}
                </p>
                <p>
                  📮 {order.pincode} — {order.city}
                </p>
                {order.landmark && <p>📍 Landmark: {order.landmark}</p>}
                <p>🏡 Address: {order.fullAddress}</p>
                <p>🏷️ Type: {order.addressType}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Order Summary:
                </h3>
                <ul className="bg-white p-3 rounded text-sm space-y-2">
                  {JSON.parse(order.orderSummary).map(
                    (item: OrderItem, idx: number) => (
                      <li key={idx} className="flex justify-between">
                        <span>
                          {item.title} ({item.size}) x {item.quantity}
                        </span>
                        <span>₹{parseFloat(item.price) * item.quantity}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-red-600 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
