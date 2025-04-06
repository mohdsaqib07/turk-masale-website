"use client";

import { useEffect, use, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [uploadingFront, setUploadingFront] = useState(false);
  const [uploadingBack, setUploadingBack] = useState(false);

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

  // ✅ Fetch product details by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/${id}`);
        const { product } = await res.json();

        if (!product) {
          toast.error("Product not found");
          router.push("/admin/products");
          return;
        }

        setForm({
          title: product.title,
          slug: product.slug,
          description: product.description,
          category: product.category,
          sizes: product.sizes
            .split(",")
            .map((size: string) => ({ value: size.trim() })),
          prices: product.prices
            .split(",")
            .map((price: string) => ({ value: price.trim() })),
          imageFront: product.imageFront,
          imageBack: product.imageBack,
        });
      } catch {
        toast.error("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleInputChange = (e: any) => {
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

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.sizes.length !== form.prices.length) {
      toast.error("Sizes and prices count must match.");
      return;
    }

    const sizesString = form.sizes.map((s) => s.value.trim()).join(",");
    const pricesString = form.prices.map((p) => p.value.trim()).join(",");

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          sizes: sizesString,
          prices: pricesString,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Product updated successfully!");
        router.push("/admin/products");
      } else {
        toast.error(data.error || "Failed to update product.");
      }
    } catch {
      toast.error("An error occurred.");
    }
  };

  if (loading) {
    return (
      <main className="py-20 px-4 bg-white min-h-screen flex justify-center items-center">
        <p className="text-gray-600">Loading product details...</p>
      </main>
    );
  }

  return (
    <main className="py-20 px-4 bg-white min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleUpdate}
        className="bg-[#FDF4EB] p-8 rounded-lg shadow-lg w-full max-w-2xl space-y-6"
      >
        <h1 className="text-2xl font-bold text-red-600 text-center mb-6">
          Edit Product
        </h1>

        {/* Title, Slug, Category */}
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
          <label className="block mb-2 font-medium text-gray-700">Sizes</label>
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
          <label className="block mb-2 font-medium text-gray-700">Prices</label>
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
              width={100}
              height={100}
              className="mt-2 rounded"
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
              className="mt-2 rounded"
            />
          )}
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Update Product
        </button>
      </form>
    </main>
  );
}
