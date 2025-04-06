// ✅ FULL FINAL CODE ✅
"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Product {
  id: number;
  title: string;
  slug: string;
  category: string;
  imageFront: string;
  sizes: string;
  prices: string;
}

const ITEMS_PER_PAGE = 6;

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    sizes: [{ value: "" }],
    prices: [{ value: "" }],
    imageFront: "",
    imageBack: "",
  });

  const [uploadingFront, setUploadingFront] = useState(false);
  const [uploadingBack, setUploadingBack] = useState(false);

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch  {
        toast.error("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Filter logic (before pagination!)
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDynamicChange = (
    index: number,
    type: "sizes" | "prices",
    value: string
  ) => {
    const updated = [...(form as any)[type]];
    updated[index].value = value;
    setForm({ ...form, [type]: updated });
  };

  const addDynamicField = (type: "sizes" | "prices") => {
    setForm({ ...form, [type]: [...(form as any)[type], { value: "" }] });
  };

  const removeDynamicField = (index: number, type: "sizes" | "prices") => {
    const updated = [...(form as any)[type]];
    if (updated.length === 1) return;
    updated.splice(index, 1);
    setForm({ ...form, [type]: updated });
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "imageFront" | "imageBack"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    type === "imageFront" ? setUploadingFront(true) : setUploadingBack(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setForm({ ...form, [type]: data.url });
        toast.success(
          `${type === "imageFront" ? "Front" : "Back"} image uploaded!`
        );
      } else {
        toast.error(data.error || "Image upload failed");
      }
    } catch {
      toast.error("An error occurred while uploading");
    } finally {
      type === "imageFront"
        ? setUploadingFront(false)
        : setUploadingBack(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.sizes.length !== form.prices.length) {
      toast.error("Sizes and prices count must match.");
      return;
    }

    const sizesString = form.sizes.map((s) => s.value.trim()).join(",");
    const pricesString = form.prices.map((p) => p.value.trim()).join(",");

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          sizes: sizesString,
          prices: pricesString,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Product added successfully!");
        setForm({
          title: "",
          slug: "",
          description: "",
          category: "",
          sizes: [{ value: "" }],
          prices: [{ value: "" }],
          imageFront: "",
          imageBack: "",
        });
        router.refresh(); // ✅ Refresh to show new product
      } else {
        toast.error(data.error || "Failed to add product.");
      }
    } catch {
      toast.error("An error occurred.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Product deleted successfully!");
        setProducts(products.filter((product) => product.id !== id));
      } else {
        toast.error(data.error || "Failed to delete product.");
      }
    } catch {
      toast.error("An error occurred while deleting.");
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      products.map((product) => ({
        ID: product.id,
        Title: product.title,
        Slug: product.slug,
        Category: product.category,
        Sizes: product.sizes,
        Prices: product.prices,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Products.xlsx");
  };

  return (
    <main className="py-20 px-4 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-red-600 mb-10 text-center">
          Admin - Product Management
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-[#FDF4EB] p-8 rounded-lg shadow-lg w-full md:max-w-2xl mx-auto space-y-6 mb-16"
        >
          <h2 className="text-2xl font-semibold text-red-600 text-center">
            Add New Product
          </h2>

          {/* Text Inputs */}
          {["title", "slug", "category"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={(form as any)[field]}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          ))}

          {/* Description */}
          <textarea
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          ></textarea>

          {/* Sizes */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Sizes
            </label>
            {form.sizes.map((size, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Size (e.g. 50g)"
                  value={size.value}
                  onChange={(e) =>
                    handleDynamicChange(index, "sizes", e.target.value)
                  }
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeDynamicField(index, "sizes")}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addDynamicField("sizes")}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Add Size
            </button>
          </div>

          {/* Prices */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Prices
            </label>
            {form.prices.map((price, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="number"
                  placeholder="Price (e.g. 50)"
                  value={price.value}
                  onChange={(e) =>
                    handleDynamicChange(index, "prices", e.target.value)
                  }
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeDynamicField(index, "prices")}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addDynamicField("prices")}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Add Price
            </button>
          </div>

          {/* Front Image */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Front Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "imageFront")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            {uploadingFront && (
              <p className="text-yellow-600 text-sm mt-1">
                Uploading front image...
              </p>
            )}
            {form.imageFront && (
              <Image
                src={form.imageFront}
                alt="Front"
                className="mt-2 w-32 rounded"
                width={100}
                height={100}
              />
            )}
          </div>

          {/* Back Image */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Back Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "imageBack")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            {uploadingBack && (
              <p className="text-yellow-600 text-sm mt-1">
                Uploading back image...
              </p>
            )}
            {form.imageBack && (
              <Image
                src={form.imageBack}
                alt="Back"
                width={100}
                height={100}
                className="mt-2 w-32 rounded"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Add Product
          </button>
        </form>
        ;{/* ✅ Add Product Form */}
        {/* Keep your form code as it is... (already clean) */}
        {/* ✅ Products Grid */}
        <h2 className="text-2xl font-semibold text-red-600 mb-6 text-center">
          Manage Products
        </h2>
        {/* Search */}
        <div className="mb-6 mx-auto w-full max-w-md">
          <input
            type="text"
            placeholder="Search by title, slug or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : paginatedProducts.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#FDF4EB] rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={product.imageFront}
                    alt={product.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm">Slug: {product.slug}</p>
                  <p className="text-gray-600 text-sm">
                    Category: {product.category}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Sizes: {product.sizes}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Prices: {product.prices}
                  </p>

                  <div className="flex space-x-2 mt-4">
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded-lg text-center hover:bg-yellow-600 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* ✅ Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => changePage(currentPage - 1)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-700 self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => changePage(currentPage + 1)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
        {/* ✅ Export Button */}
        {products.length > 0 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={exportToExcel}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              📥 Download All Products (Excel)
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
