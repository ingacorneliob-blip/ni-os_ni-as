"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Loader2 } from "lucide-react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal State
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Fetch products on mount
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/products");
            if (!res.ok) throw new Error("Error fetching products");
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error(err);
            setError("No se pudieron cargar los productos.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenForm = (product = null) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingProduct(null);
    };

    const handleSubmit = async (formData) => {
        try {
            const isEditing = !!editingProduct;
            const url = isEditing ? `/api/products/${editingProduct.id}` : "/api/products";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Error guardando el producto");

            // Reload products and close modal
            await fetchProducts();
            handleCloseForm();
        } catch (err) {
            console.error(err);
            alert("Hubo un error al guardar el producto.");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) return;

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Error eliminando el producto");

            // Update local state directly instead of refetching for faster UI response
            setProducts(products.filter((p) => p.id !== id));
        } catch (err) {
            console.error(err);
            alert("Hubo un error al eliminar el producto.");
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Administración</h1>
                    <p className="text-gray-400 mt-1">Gestiona tu catálogo de productos y ventas.</p>
                </div>
                <button
                    onClick={() => handleOpenForm()}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                    <PlusCircle size={18} />
                    Nuevo Producto
                </button>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-emerald-400 gap-3">
                    <Loader2 className="animate-spin w-8 h-8" />
                    <p className="text-gray-400 font-medium">Cargando catálogo...</p>
                </div>
            ) : error ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center text-red-400">
                    <p>{error}</p>
                    <button
                        onClick={fetchProducts}
                        className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors text-sm font-medium text-white"
                    >
                        Reintentar
                    </button>
                </div>
            ) : (
                <ProductList
                    products={products}
                    onEdit={handleOpenForm}
                    onDelete={handleDelete}
                />
            )}

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <ProductForm
                        initialData={editingProduct}
                        onSubmit={handleSubmit}
                        onCancel={handleCloseForm}
                    />
                </div>
            )}
        </div>
    );
}
