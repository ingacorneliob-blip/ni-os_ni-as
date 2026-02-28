"use client";

import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";

export default function ProductList({ products, onEdit, onDelete }) {
    if (!products || products.length === 0) {
        return (
            <div className="text-center py-10 text-gray-400">
                <p>No hay productos registrados aún.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-[#1a1c23] rounded-xl border border-gray-800">
            <table className="w-full text-left">
                <thead className="bg-[#2a2d39] text-gray-300 text-sm">
                    <tr>
                        <th className="p-4 font-medium rounded-tl-xl whitespace-nowrap">Producto</th>
                        <th className="p-4 font-medium whitespace-nowrap">Categoría</th>
                        <th className="p-4 font-medium whitespace-nowrap">Género</th>
                        <th className="p-4 font-medium whitespace-nowrap">Precio</th>
                        <th className="p-4 font-medium whitespace-nowrap">Tallas</th>
                        <th className="p-4 font-medium rounded-tr-xl text-right whitespace-nowrap">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-[#20222a] transition-colors">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    {product.imageUrl ? (
                                        <div className="w-10 h-10 rounded-lg overflow-hidden relative flex-shrink-0 bg-gray-800">
                                            <Image
                                                src={product.imageUrl}
                                                alt={product.title}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs text-gray-500">Sin img</span>
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-medium text-white line-clamp-1">{product.title}</p>
                                        <p className="text-xs text-gray-400 line-clamp-1">{product.description || "Sin descripción"}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 text-gray-300 capitalize">{product.category}</td>
                            <td className="p-4 text-gray-300 capitalize">{product.gender}</td>
                            <td className="p-4 text-emerald-400 font-medium whitespace-nowrap">S/{product.price}</td>
                            <td className="p-4 text-gray-300">
                                <div className="flex flex-wrap gap-1">
                                    {product.sizes.map((size) => (
                                        <span key={size} className="text-xs bg-gray-800 px-2 py-0.5 rounded-md">
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className="p-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => onEdit(product)}
                                        className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                        title="Editar producto"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(product.id)}
                                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                        title="Eliminar producto"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
