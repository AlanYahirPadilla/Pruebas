// resources/js/Pages/Dashboard.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, recyclingHistory, materialStats, availableRewards, userPoints }) {
    // Convertir materialStats de objeto a array para facilitar el mapeo
    const materialsArray = Object.entries(materialStats || {}).map(([name, data]) => ({
        name,
        quantity: data.quantity,
        points: data.points
    }));

    // Calcular total de materiales reciclados
    const totalMaterials = materialsArray.reduce((sum, material) => sum + material.quantity, 0);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Mis Puntos */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2">Mis Puntos</h3>
                                <div className="text-3xl font-bold text-green-600">{userPoints}</div>
                                <div className="mt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Progreso hacia próxima recompensa</span>
                                        <span>{userPoints}/500</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div 
                                            className="bg-green-600 h-2.5 rounded-full" 
                                            style={{ width: `${Math.min((userPoints/500) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Materiales Reciclados */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2">Materiales Reciclados</h3>
                                <div className="text-3xl font-bold text-green-600">{totalMaterials}</div>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    {materialsArray.map(material => (
                                        <div key={material.name}>
                                            <span className="block text-gray-500">{material.name}</span>
                                            <span className="font-medium">{material.quantity} unidades</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actividad de Reciclaje */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Actividad de Reciclaje</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-2">Fecha</th>
                                            <th className="text-left py-3 px-2">Material</th>
                                            <th className="text-left py-3 px-2">Cantidad</th>
                                            <th className="text-left py-3 px-2">Puntos</th>
                                            <th className="text-left py-3 px-2">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recyclingHistory && recyclingHistory.map((record) => (
                                            <tr key={record.id} className="border-b">
                                                <td className="py-3 px-2">
                                                    {new Date(record.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-2">{record.material.name}</td>
                                                <td className="py-3 px-2">{record.quantity}</td>
                                                <td className="py-3 px-2">{record.points_earned}</td>
                                                <td className="py-3 px-2">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                                        record.status === 'approved' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {record.status === 'approved' ? 'Aprobado' : 'Pendiente'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {(!recyclingHistory || recyclingHistory.length === 0) && (
                                            <tr>
                                                <td colSpan="5" className="py-4 text-center text-gray-500">
                                                    No hay registros de reciclaje
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Recompensas Disponibles */}
                    {availableRewards && availableRewards.length > 0 && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Recompensas Disponibles</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {availableRewards.map(reward => (
                                        <div key={reward.id} className="border rounded-lg p-4">
                                            <h4 className="font-semibold">{reward.name}</h4>
                                            <p className="text-sm text-gray-500">{reward.description}</p>
                                            <div className="mt-2 text-xl font-bold text-green-600">{reward.points_cost} pts</div>
                                            <button className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
                                                Canjear
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}