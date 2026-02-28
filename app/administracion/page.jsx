import AdminDashboard from "@/src/components/admin/AdminDashboard";

export const metadata = {
    title: "Administración - Tiendas",
    description: "Panel de administración de productos",
};

export default function AdministracionPage() {
    return (
        <main className="min-h-screen bg-[#0f1115] text-white">
            <AdminDashboard />
        </main>
    );
}
