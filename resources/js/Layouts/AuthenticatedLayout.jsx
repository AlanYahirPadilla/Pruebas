// resources/js/Layouts/AuthenticatedLayout.jsx
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import UserMenu from '@/Components/UserMenu';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false); // Cambiado a false por defecto

    const ResponsiveNavLink = ({ href, method = 'get', as = 'a', active = false, children }) => {
        return (
            <Link
                href={href}
                method={method}
                as={as}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition duration-150 ease-in-out ${
                    active
                        ? 'border-white text-white bg-green-700'
                        : 'border-transparent text-gray-200 hover:text-white hover:bg-green-700'
                }`}
            >
                {children}
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            {/* Botón para mostrar/ocultar el sidebar */}
                            <button
                                onClick={() => setShowSidebar(!showSidebar)}
                                className="inline-flex items-center justify-center p-2 mr-2 rounded-md text-white hover:bg-green-700 focus:outline-none transition duration-150 ease-in-out"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            
                            <div className="shrink-0 flex items-center">
                                <Link href="/" className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                    </div>
                                    <span className="text-2xl font-bold">EcoTracker</span>
                                    {user.role === 'admin' && (
                                        <span className="bg-white text-green-600 px-2 py-0.5 rounded text-xs font-bold">
                                            ADMIN
                                        </span>
                                    )}
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
    <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
            <span className="font-bold">{user.points || 0} puntos</span>
        </div>
        <UserMenu user={user} />
    </div>
</div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-700 focus:outline-none transition duration-150 ease-in-out"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('recycle')} active={route().current('recycle')}>
                            Registrar Reciclaje
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('rewards')} active={route().current('rewards')}>
                            Recompensas
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-white">{user.name}</div>
                            <div className="font-medium text-sm text-gray-200">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Perfil</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Cerrar Sesión
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar izquierdo */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <div className="h-full flex flex-col">
                    <div className="p-4 border-b">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowSidebar(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4">
                        <nav className="space-y-2">
                            <Link
                                href={route('dashboard')}
                                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span>Dashboard</span>
                            </Link>
                            
                            <Link
                                href={route('recycle')}
                                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>Registrar Reciclaje</span>
                            </Link>
                            
                            <Link
                                href={route('rewards')}
                                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                </svg>
                                <span>Recompensas</span>
                            </Link>
                            
                            {user.role === 'admin' && (
                                <Link
                                    href={route('admin.dashboard')}
                                    className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <span>Admin Dashboard</span>
                                </Link>
                            )}
                        </nav>
                    </div>
                    
                    <div className="p-4 border-t">
                        <Link
                            href={route('profile.edit')}
                            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Mi Perfil</span>
                        </Link>
                        
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Cerrar Sesión</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Contenido principal - sin margen fijo */}
            <div className="transition-all duration-300 ease-in-out">
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                <main className="flex-1">
                    {children}
                </main>
            </div>
            
            {/* Overlay para cerrar el sidebar en móvil */}
            {showSidebar && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setShowSidebar(false)}
                ></div>
            )}
        </div>
    );
}