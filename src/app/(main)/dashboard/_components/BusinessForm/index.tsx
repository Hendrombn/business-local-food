'use client';

import { useState, useEffect } from 'react';

import type {
  BusinessFormProps,
  BusinessFormData,
} from '../../Dashboard.types';

const initialFormData: BusinessFormData = {
  name: '',
  categoryId: '',
  address: '',
  lat: '',
  lng: '',
  phone: '',
  website: '',
  description: '',
  openTime: '',
  closeTime: '',
  operatingDays: '',
};

export default function BusinessForm({
  categories,
  initialData,
  onSubmit,
  isSubmitting,
  submitLabel,
}: BusinessFormProps) {
  const [formData, setFormData] = useState<BusinessFormData>(initialFormData);

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: initialData.name || '',
        categoryId: initialData.categoryId || initialData.category?.id || '',
        address: initialData.address || '',
        lat: initialData.lat?.toString() || '',
        lng: initialData.lng?.toString() || '',
        phone: initialData.phone || '',
        website: initialData.website || '',
        description: initialData.description || '',
        openTime: initialData.openTime || '',
        closeTime: initialData.closeTime || '',
        operatingDays: initialData.operatingDays || '',
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nama */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Nama Bisnis <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
          placeholder="Masukkan nama bisnis"
        />
      </div>

      {/* Kategori */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Kategori <span className="text-red-500">*</span>
        </label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
        >
          <option value="">Pilih kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Alamat */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Alamat <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
          placeholder="Masukkan alamat lengkap"
        />
      </div>

      {/* Koordinat */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Latitude <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
            placeholder="-6.2088"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Longitude <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lng"
            value={formData.lng}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
            placeholder="106.8456"
          />
        </div>
      </div>

      {/* Telepon & Website */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Telepon
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
            placeholder="08123456789"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Website
          </label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
            placeholder="https://example.com"
          />
        </div>
      </div>

      {/* Deskripsi */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Deskripsi
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
          placeholder="Deskripsikan bisnismu..."
        />
      </div>

      {/* Jam Operasional */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Jam Buka
          </label>
          <input
            type="time"
            name="openTime"
            value={formData.openTime}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Jam Tutup
          </label>
          <input
            type="time"
            name="closeTime"
            value={formData.closeTime}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Hari Operasional */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Hari Operasional
        </label>
        <input
          type="text"
          name="operatingDays"
          value={formData.operatingDays}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
          placeholder="Senin - Minggu"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full rounded-lg bg-green-600 py-3 font-medium text-white transition-colors ${
          isSubmitting ? 'cursor-not-allowed opacity-50' : 'hover:bg-green-700'
        }`}
      >
        {isSubmitting ? 'Menyimpan...' : submitLabel}
      </button>
    </form>
  );
}
