// resources/js/Pages/Auth/Login.jsx
import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Leaf } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Iniciar Sesión" />

            <div className="min-h-screen flex flex-col">
                <header className="bg-green-600 text-white py-4">
                    <div className="container mx-auto px-4">
                        <Link href="/" className="flex items-center gap-2 w-fit">
                            <Leaf className="h-6 w-6" />
                            <h1 className="text-2xl font-bold">EcoTracker</h1>
                        </Link>
                    </div>
                </header>

                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-center mb-2">Iniciar Sesión</h2>
                        <p className="text-gray-600 text-center mb-6">
                            Ingresa tus credenciales para acceder a tu cuenta
                        </p>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
                        )}

                        <form onSubmit={submit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="tu@correo.com"
                                    />
                                    {errors.email && (
                                        <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                                    )}
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Contraseña
                                        </label>
                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-sm text-green-600 hover:text-green-500"
                                            >
                                                ¿Olvidaste tu contraseña?
                                            </Link>
                                        )}
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {errors.password && (
                                        <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Iniciar Sesión
                                </button>
                            </div>

                            <div className="mt-6 text-center text-sm text-gray-600">
                                <p className="font-medium mb-4">Para probar, usa:</p>
                                <p>Usuario normal: user@example.com</p>
                                <p>Administrador: admin@example.com</p>
                                <p>Contraseña: password</p>
                            </div>

                            <div className="mt-6 text-center text-sm">
                                ¿No tienes una cuenta?{' '}
                                <Link href={route('register')} className="text-green-600 hover:text-green-500">
                                    Regístrate
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>

                <footer className="bg-gray-100 py-6">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-gray-600">© 2025 EcoTracker - CUCEI. Todos los derechos reservados.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}