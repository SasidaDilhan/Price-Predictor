"use client";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    ram: "",
    weight: "",
    company: "",
    typename: "",
    opsys: "",
    cpuname: "",
    gpuname: "",
    touchscreen: false,
    ips: false,
  });

  const [prediction, setPrediction] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" && (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setPrediction(data.prediction);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-50 text-black shadow-md rounded-xl mt-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        Laptop Price Predictor
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* RAM */}
        <div>
          <label className="block mb-1 font-medium">RAM (GB)</label>
          <input
            type="number"
            name="ram"
            value={formData.ram}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block mb-1 font-medium">Weight (Kg)</label>
          <input
            type="number"
            step="0.1"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block mb-1 font-medium">Company</label>
          <select
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select</option>
            <option value="acer">Acer</option>
            <option value="apple">Apple</option>
            <option value="asus">Asus</option>
            <option value="dell">Dell</option>
            <option value="hp">HP</option>
            <option value="lenovo">Lenovo</option>
            <option value="msi">MSI</option>
            <option value="toshiba">Toshiba</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Typename */}
        <div>
          <label className="block mb-1 font-medium">Type Name</label>
          <select
            name="typename"
            value={formData.typename}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select</option>
            <option value="2in1convertible">2 in 1 Convertible</option>
            <option value="gaming">Gaming</option>
            <option value="netbook">Netbook</option>
            <option value="notebook">Notebook</option>
            <option value="ultrabook">Ultrabook</option>
            <option value="workstation">Workstation</option>
          </select>
        </div>

        {/* OS */}
        <div>
          <label className="block mb-1 font-medium">Operating System</label>
          <select
            name="opsys"
            value={formData.opsys}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select</option>
            <option value="windows">Windows</option>
            <option value="mac">Mac</option>
            <option value="linux">Linux</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* CPU */}
        <div>
          <label className="block mb-1 font-medium">CPU</label>
          <select
            name="cpuname"
            value={formData.cpuname}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select</option>
            <option value="intelcorei3">Intel Core i3</option>
            <option value="intelcorei5">Intel Core i5</option>
            <option value="intelcorei7">Intel Core i7</option>
            <option value="amd">AMD</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* GPU */}
        <div>
          <label className="block mb-1 font-medium">GPU</label>
          <select
            name="gpuname"
            value={formData.gpuname}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select</option>
            <option value="intel">Intel</option>
            <option value="amd">AMD</option>
            <option value="nvidia">Nvidia</option>
          </select>
        </div>

        {/* Checkboxes */}
        <div className="flex space-x-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="touchscreen"
              checked={formData.touchscreen}
              onChange={handleChange}
            />
            <span>Touchscreen</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="ips"
              checked={formData.ips}
              onChange={handleChange}
            />
            <span>IPS</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Predict Price
        </button>
      </form>

      <div className="mt-6 text-center">
        {prediction !== null ? (
          <p className="text-lg font-semibold">
            Estimated Price: LKR {prediction}
          </p>
        ) : (
          <p className="text-gray-500">Estimated Price: LKR 0.00</p>
        )}
      </div>
    </div>
  );
}
