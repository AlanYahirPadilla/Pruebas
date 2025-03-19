// resources/js/Pages/Admin/Dashboard.jsx
import { useState } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function AdminDashboard({ auth, pendingValidations = [], stats = {} }) {
    const [validations, setValidations] = useState(pendingValidations);

    const handleApprove = (id) => {
        if (confirm('¿Estás seguro de aprobar este registro?')) {
            router.post(route('admin.validations.approve', id), {}, {
                preserveScroll: true,
                onSuccess: () => {
                    // Actualizar el estado local
                    setValidations(current =>
                        current.filter(validation => validation.id !== id)
                    );
                }
            });
        }
    };

    const handleReject = (id) => {
        if (confirm('¿Estás seguro de rechazar este registro?')) {
            router.post(route('admin.validations.reject', id), {}, {
                preserveScroll: true,
                onSuccess: () => {
                    // Actualizar el estado local
                    setValidations(current =>
                        current.filter(validation => validation.id !== id)
                    );
                }
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard de Administración" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold mb-6">Dashboard de Administración</h2>
                    <p className="text-gray-500 mb-6">Gestiona todos los aspectos del sistema EcoTracker</p>
                    
                    {/* Estadísticas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2">Total Usuarios</h3>
                                <div className="text-3xl font-bold">{stats.users?.total || 0}</div>
                                <div className="text-sm text-gray-500 mt-1">
                                    +{stats.users?.increase || 0} esta semana
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2">Material Reciclado</h3>
                                <div className="text-3xl font-bold">{stats.material?.total || 0} kg</div>
                                <div className="text-sm text-gray-500 mt-1">
                                    +{stats.material?.increase || 0} kg esta semana
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2">Puntos Canjeados</h3>
                                <div className="text-3xl font-bold">{stats.points?.total || 0}</div>
                                <div className="text-sm text-gray-500 mt-1">
                                    +{stats.points?.increase || 0} esta semana
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Validaciones Pendientes */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Validaciones Pendientes</h3>
                                <a href="#" className="text-green-600 text-sm hover:underline">Ver todas</a>
                            </div>
                            <div className="overflow-x-auto">
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
                                        {validations.length > 0 ? (
                                            validations.map((record) => (
                                                <tr key={record.id} className="border-b">
                                                    <td className="py-3 px-2">{record.user?.name}</td>
                                                    <td className="py-3 px-2">{record.material?.name}</td>
                                                    <td className="py-3 px-2">{record.quantity}</td>
                                                    <td className="py-3 px-2">{record.points_estimate || 0}</td>
                                                    <td className="py-3 px-2">
                                                        {new Date(record.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="py-3 px-2">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleApprove(record.id)}
                                                                className="p-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                                                                title="Aprobar"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() => handleReject(record.id)}
                                                                className="p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                                                title="Rechazar"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="py-4 text-center text-gray-500">
                                                    No hay validaciones pendientes
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    {/* Distribución de Materiales */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Distribución de Materiales</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">Papel</span>
                                        <span className="text-sm font-medium">35%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">Plástico</span>
                                        <span className="text-sm font-medium">25%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">Aluminio</span>
                                        <span className="text-sm font-medium">20%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">Cartón</span>
                                        <span className="text-sm font-medium">15%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: "15%" }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">Vidrio</span>
                                        <span className="text-sm font-medium">5%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "5%" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Actividad Reciente */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Actividad Reciente</h3>
                                <button className="flex items-center gap-1 text-green-600 text-sm hover:underline">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
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
                                        <tr className="border-b">
                                            <td className="py-3 px-2">Juan Pérez</td>
                                            <td className="py-3 px-2">Registro de reciclaje</td>
                                            <td className="py-3 px-2">Papel (15)</td>
                                            <td className="py-3 px-2">14/03/2025</td>
                                            <td className="py-3 px-2">
                                                <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                                                    Pendiente
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-3 px-2">María López</td>
                                            <td className="py-3 px-2">Registro de reciclaje</td>
                                            <td className="py-3 px-2">Plástico (20)</td>
                                            <td className="py-3 px-2">13/03/2025</td>
                                            <td className="py-3 px-2">
                                                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                                    Aprobado
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-3 px-2">Carlos Rodríguez</td>
                                            <td className="py-3 px-2">Canje de recompensa</td>
                                            <td className="py-3 px-2">Café Gratis (100 pts)</td>
                                            <td className="py-3 px-2">12/03/2025</td>
                                            <td className="py-3 px-2">
                                                <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                                    Completado
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-3 px-2">Ana Martínez</td>
                                            <td className="py-3 px-2">Registro de reciclaje</td>
                                            <td className="py-3 px-2">Vidrio (8)</td>
                                            <td className="py-3 px-2">11/03/2025</td>
                                            <td className="py-3 px-2">
                                                <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                                                    Rechazado
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}