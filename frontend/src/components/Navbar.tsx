import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

export const Navbar = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="glass sticky top-0 z-50 w-full px-6 py-4 flex justify-between items-center rounded-b-2xl border-t-0 border-x-0">
            <div className="flex items-center gap-4">
                <Link to="/dashboard" className="text-2xl font-bold text-primary-500 hover:text-primary-400 transition-colors">
                    TreasureEarn
                </Link>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                    <p className="font-medium text-white">{user?.username}</p>
                    <p className="text-sm border flex items-center justify-center w-full px-2 py-0.5 rounded-full border-primary-500/30 text-primary-400 bg-primary-500/10">
                        ${user?.availableBalance ? Number(user.availableBalance).toFixed(2) : '0.00'}
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};
