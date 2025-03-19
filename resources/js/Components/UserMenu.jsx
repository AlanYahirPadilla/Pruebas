// resources/js/Components/UserMenu.jsx
import { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function UserMenu({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Cerrar el menú al hacer clic fuera
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-white hover:text-gray-200 focus:outline-none"
            >
                <span>{user.name}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl z-20">
                    <Link
                        href={route('profile.edit')}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Mi Perfil
                    </Link>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Cerrar Sesión
                    </Link>
                </div>
            )}
        </div>
    );
}