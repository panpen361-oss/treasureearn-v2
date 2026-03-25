import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navItems = [
    { label: 'Home', path: '/home', icon: '🏠' },
    { label: 'Earn', path: '/earn', icon: '⚡' },
    { label: 'Cashout', path: '/cashout', icon: '💸' },
    { label: 'Leaderboard', path: '/leaderboard', icon: '🏆' },
    { label: 'Referrals', path: '/referrals', icon: '👥' },
    { label: 'Privacy', path: '/privacy', icon: '🛡️' },
    { label: 'Terms', path: '/terms', icon: '📄' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const location = useLocation();
    const { user, isAuthenticated, logout } = useAuthStore();

    return (
        <aside
            className={`fixed md:sticky top-0 left-0 z-40 h-screen transition-all duration-300 border-r border-white/8 bg-dark-surface flex flex-col shrink-0 overflow-hidden
                ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-20 md:translate-x-0'}
            `}
        >
            {/* Logo Section */}
            <div className={`p-6 border-b border-white/8 flex items-center shrink-0 ${isOpen ? 'justify-between' : 'justify-center'}`}>
                <Link to="/home" className="flex items-center gap-3">
                    <span className="text-2xl">💎</span>
                    {isOpen && <span className="text-xl font-bold text-white transition-opacity duration-200">TreasureEarn</span>}
                </Link>
                {/* Mobile close button */}
                <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white text-xl">
                    ✕
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto overflow-x-hidden">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive
                                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                } ${!isOpen && 'justify-center px-0'}`}
                            title={!isOpen ? item.label : ''}
                        >
                            <span className="text-lg shrink-0 w-6 h-6 flex items-center justify-center">{item.icon}</span>
                            {isOpen && (
                                <span className="transition-opacity duration-200 whitespace-nowrap">
                                    {item.label}
                                </span>
                            )}
                            {isActive && isOpen && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-white/8 shrink-0">
                {isAuthenticated && user ? (
                    <div className="space-y-3">
                        {/* Balance pill */}
                        {isOpen ? (
                            <div className="glass rounded-xl p-3 text-center">
                                <p className="text-xs text-gray-400 mb-0.5 whitespace-nowrap">Available Balance</p>
                                <p className="text-lg font-bold">
                                    <span className="gold-text">$</span>
                                    <span className="text-white">{Number(user.availableBalance || 0).toFixed(2)}</span>
                                </p>
                            </div>
                        ) : (
                            <div className="flex justify-center py-2" title={`Balance: $${Number(user.availableBalance || 0).toFixed(2)}`}>
                                <span className="text-primary-400 font-bold text-xl">$</span>
                            </div>
                        )}

                        {/* User row */}
                        <div className={`flex items-center gap-3 ${isOpen ? 'px-2 justify-between' : 'justify-center'}`}>
                            <div className="w-8 h-8 rounded-full bg-primary-500/30 flex items-center justify-center text-primary-400 font-bold text-sm shrink-0 border border-primary-500/20">
                                {user.username[0].toUpperCase()}
                            </div>
                            {isOpen && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">{user.username}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                            )}
                            {isOpen && (
                                <button
                                    onClick={() => logout()}
                                    title="Logout"
                                    className="text-gray-500 hover:text-red-400 transition-colors text-lg"
                                >
                                    ⏻
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <Link
                            to="/login"
                            className={`btn-primary flex items-center justify-center py-2.5 transition-all ${isOpen ? 'w-full text-sm' : 'w-10 h-10 rounded-full p-0 mx-auto'}`}
                            title={!isOpen ? "Sign In" : ""}
                        >
                            {isOpen ? 'Sign In' : <span className="text-xl">➔</span>}
                        </Link>
                        {isOpen && (
                            <Link to="/register" className="block text-center py-2.5 text-sm text-gray-400 hover:text-white glass rounded-lg transition-all whitespace-nowrap">
                                Create Account
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </aside>
    );
};
