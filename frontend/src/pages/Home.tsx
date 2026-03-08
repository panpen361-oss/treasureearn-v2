import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <div className="min-h-screen bg-dark-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="z-10 text-center max-w-3xl glass-card border-none bg-dark-surface/40 p-12">
                <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-white to-primary-600 mb-6 drop-shadow-sm">
                    TreasureEarn
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light">
                    The most premium platform to complete tasks, share your opinion, and earn real rewards instantly.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/register"
                        className="btn-primary text-lg px-8 py-4 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transform hover:-translate-y-1"
                    >
                        Start Earning Now
                    </Link>
                    <Link
                        to="/login"
                        className="px-8 py-4 text-lg font-medium text-white glass hover:bg-white/10 rounded-lg transition-all transform hover:-translate-y-1"
                    >
                        Login to Account
                    </Link>
                </div>
            </div>

            {/* Feature grid */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl z-10 w-full px-4">
                <div className="glass-card text-center">
                    <div className="text-4xl mb-4">💰</div>
                    <h3 className="text-xl font-bold text-white mb-2">High Payouts</h3>
                    <p className="text-gray-400">We partner with top offerwalls to bring you the best rates.</p>
                </div>
                <div className="glass-card text-center">
                    <div className="text-4xl mb-4">⚡</div>
                    <h3 className="text-xl font-bold text-white mb-2">Fast Cashouts</h3>
                    <p className="text-gray-400">Withdraw your earnings quickly with minimal wait times.</p>
                </div>
                <div className="glass-card text-center">
                    <div className="text-4xl mb-4">🛡️</div>
                    <h3 className="text-xl font-bold text-white mb-2">Secure & Fair</h3>
                    <p className="text-gray-400">Advanced anti-fraud systems protect both you and advertisers.</p>
                </div>
            </div>
        </div>
    );
};
