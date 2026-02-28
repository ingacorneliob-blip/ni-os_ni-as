"use client";

import { useState, useEffect } from "react";
import { X, Save, Image as ImageIcon } from "lucide-react";

const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL", "38", "39", "40", "41", "42", "43", "44"];

export default function ProductForm({ initialData = null, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        imageUrl: "",
        category: "Polos", // default
        gender: "hombre",  // default
        sizes: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                description: initialData.description || "",
                price: initialData.price || "",
                imageUrl: initialData.imageUrl || "",
                category: initialData.category || "Polos",
                gender: initialData.gender || "hombre",
                sizes: initialData.sizes || [],
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSizeToggle = (size) => {
        setFormData((prev) => {
            const currentSizes = [...prev.sizes];
            if (currentSizes.includes(size)) {
                return { ...prev, sizes: currentSizes.filter((s) => s !== size) };
            } else {
                return { ...prev, sizes: [...currentSizes, size] };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#1a1c23] rounded-xl border border-gray-800 p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">
                    {initialData ? "Editar Producto" : "Nuevo Producto"}
                </h2>
                <button
                    onClick={onCancel}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Título del Producto *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#0f1115] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                            placeholder="Ej. Polo Oversize Black"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full bg-[#0f1115] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
                            placeholder="Descripción detallada del producto..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Precio (S/) *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                className="w-full bg-[#0f1115] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">URL de Imagen</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <ImageIcon size={18} className="text-gray-500" />
                                </div>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    className="w-full bg-[#0f1115] border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-800" />

                {/* Classification */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Categoría *</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#0f1115] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors appearance-none"
                        >
                            <option value="Polos">Polos</option>
                            <option value="Camisas">Camisas</option>
                            <option value="Pantalones">Pantalones</option>
                            <option value="Zapatillas">Zapatillas</option>
                            <option value="Accesorios">Accesorios</option>
                            <option value="Casacas">Casacas</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Género *</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#0f1115] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors appearance-none"
                        >
                            <option value="hombre">Hombre</option>
                            <option value="mujer">Mujer</option>
                            <option value="unisex">Unisex</option>
                            <option value="niños">Niños</option>
                        </select>
                    </div>
                </div>

                {/* Sizes */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tallas Disponibles * (Selecciona al menos una)</label>
                    <div className="flex flex-wrap gap-2">
                        {AVAILABLE_SIZES.map((size) => {
                            const isSelected = formData.sizes.includes(size);
                            return (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => handleSizeToggle(size)}
                                    className={`min-w-[40px] h-10 px-3 rounded-lg border text-sm font-medium transition-all ${isSelected
                                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                                            : "bg-[#0f1115] border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200"
                                        }`}
                                >
                                    {size}
                                </button>
                            );
                        })}
                    </div>
                    {formData.sizes.length === 0 && (
                        <p className="text-red-400 text-xs mt-2">Debes seleccionar al menos una talla.</p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white bg-transparent hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting || formData.sizes.length === 0}
                        className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
                    >
                        <Save size={18} />
                        {isSubmitting ? "Guardando..." : "Guardar Producto"}
                    </button>
                </div>
            </form>
        </div>
    );
}
