// resources/js/Pages/Admin/Dashboard.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { CheckCircle, XCircle, Download } from 'lucide-react';

export default function AdminDashboard({ auth, totalUsers, totalMaterialRecycled, totalPointsRedeemed, pendingValidations, materialDistribution, recentActivity }) {
    const handleApprove = (id) => {
        // Implementar lógica para aprobar
    };

    const handleReject = (id) => {
        // Implementar lógica para rechazar
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard de Administración</h2>}
        >
            <Head title="Dashboard de Administración" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <p className="text-gray-500 mb-8">Gestiona todos los aspectos del sistema EcoTracker</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Total Usuarios */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-2">Total Usuarios</h3>
                            <div className="text-3xl font-bold">{totalUsers}</div>
                            <div className="text-sm text-gray-500">+15 esta semana</div>
                        </div>

                        {/* Material Reciclado */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-2">Material Reciclado</h3>
                            <div className="text-3xl font-bold">{totalMaterialRecycled} kg</div>
                            <div className="text-sm text-gray-500">+120 kg esta semana</div>
                        </div>

                        {/* Puntos Canjeados */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-2">Puntos Canjeados</h3>
                            <div className="text-3xl font-bold">{totalPointsRedeemed}</div>
                            <div className="text-sm text-gray-500">+1,200 esta semana</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Validaciones Pendientes */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Validaciones Pendientes</h3>
                                <button className="text-sm text-green-600 hover:text-green-700">Ver todas</button>
                            </div>
                            <div className="overflow-x-auto">
                                {pendingValidations.length > 0 ? (
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-3 px-2">Usuario</th>
                                                <th className="text-left py-3 px-2">Material</th>
                                                <th className="text-left py-3 px-2">Cantidad</th>
                                                <th className="text-left py-3 px-2">Puntos</th>
                                                <th className="text-left py-3 px-2">Fecha</th>
                                                <th className="text-left py-3 px-2">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pendingValidations.map((item) => (
                                                <tr key={item.id} className="border-b">
                                                    <td className="py-3 px-2">{item.user.name}</td>
                                                    <td className="py-3 px-2">{item.material.name}</td>
                                                    <td className="py-3 px-2">{item.quantity}</td>
                                                    <td className="py-3 px-2">{item.points_earned}</td>
                                                    <td className="py-3 px-2">{new Date(item.created_at).toLocaleDateString()}</td>
                                                    <td className="py-3 px-2">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleApprove(item.id)}
                                                                className="p-1 bg-green-600 text-white rounded hover:bg-green-700"
                                                            >
                                                                <CheckCircle className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleReject(item.id)}
                                                                className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
                                                            >
                                                                <XCircle className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="text-center py-6 text-gray-500">No hay validaciones pendientes</div>
                                )}
                            </div>
                        </div>

                        {/* Distribución de Materiales */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">Distribución de Materiales</h3>
                            <div className="space-y-4">
                                {materialDistribution.map((item) => (
                                    <div key={item.name}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium">{item.name}</span>
                                            <span className="text-sm font-medium">{item.percentage}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-green-600 h-2.5 rounded-full"
                                                style={{ width: `${item.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actividad Reciente */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Actividad Reciente</h3>
                            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                                <Download className="h-4 w-4" />
                                Exportar
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-2">Usuario</th>
                                        <th className="text-left py-3 px-2">Acción</th>
                                        <th className="text-left py-3 px-2">Detalles</th>
                                        <th className="text-left py-3 px-2">Fecha</th>
                                        <th className="text-left py-3 px-2">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentActivity.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="py-3 px-2">{item.user}</td>
                                            <td className="py-3 px-2">{item.action}</td>
                                            <td className="py-3 px-2">{item.details}</td>
                                            <td className="py-3 px-2">{item.date}</td>
                                            <td className="py-3 px-2">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${
                                                        item.status === "approved"
                                                            ? "bg-green-100 text-green-800"
                                                            : item.status === "rejected"
                                                            ? "bg-red-100 text-red-800"
                                                            : item.status === "completed"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : "bg-yellow-100 text-yellow-800"
                                                    }`}
                                                >
                                                    {item.status === "approved" ? "Aprobado" : 
                                                     item.status === "rejected" ? "Rechazado" : 
                                                     item.status === "completed" ? "Completado" : "Pendiente"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}