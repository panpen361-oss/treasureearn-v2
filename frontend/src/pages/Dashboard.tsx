import { useAuthStore } from '../store/auth.store';

export const Dashboard = () => {
    const { user } = useAuthStore();

    return (
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white">Welcome back, {user?.username}!</h1>
                <p className="text-gray-400 mt-2">Here's an overview of your earnings and available tasks.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card">
                    <h3 className="text-gray-400 text-sm font-medium mb-1">Available Balance</h3>
                    <p className="text-4xl font-bold">
                        <span className="gold-text">$</span>
                        <span className="text-white">{user?.availableBalance ? Number(user.availableBalance).toFixed(2) : '0.00'}</span>
                    </p>
                </div>

                <div className="glass-card">
                    <h3 className="text-gray-400 text-sm font-medium mb-1">Pending Balance</h3>
                    <p className="text-3xl font-semibold">
                        <span className="gold-text">$</span>
                        <span className="text-white">{user?.pendingBalance ? Number(user.pendingBalance).toFixed(2) : '0.00'}</span>
                    </p>
                </div>

                <div className="glass-card">
                    <h3 className="text-gray-400 text-sm font-medium mb-1">Lifetime Earned</h3>
                    <p className="text-3xl font-semibold">
                        <span className="gold-text">$</span>
                        <span className="text-white">{user?.lifetimeEarned ? Number(user.lifetimeEarned).toFixed(2) : '0.00'}</span>
                    </p>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6">Top Offerwalls</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Placeholder for offerwalls */}
                    {['Torox', 'RevU', 'AdGate', 'Lootably'].map((provider) => (
                        <div key={provider} className="glass-card flex flex-col items-center justify-center p-8 hover:bg-white/5 cursor-pointer">
                            <div className="w-16 h-16 bg-dark-background rounded-full mb-4 flex items-center justify-center border border-white/10">
                                <span className="font-bold text-xl text-primary-500">{provider[0]}</span>
                            </div>
                            <h3 className="text-lg font-bold text-white">{provider}</h3>
                            <p className="text-xs text-green-400 mt-2">+50% Bonus Active</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
