import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

// SVG logos via CDN (SimpleIcons)
const cashoutMethods = [
    {
        name: 'PayPal',
        color: '#003087',
        logo: 'https://cdn.simpleicons.org/paypal/ffffff',
    },
    {
        name: 'Solana',
        color: '#9945FF',
        logo: 'https://cdn.simpleicons.org/solana/ffffff',
    },
    {
        name: 'Bitcoin',
        color: '#F7931A',
        logo: 'https://cdn.simpleicons.org/bitcoin/ffffff',
    },
    {
        name: 'Ethereum',
        color: '#627EEA',
        logo: 'https://cdn.simpleicons.org/ethereum/ffffff',
    },
    {
        name: 'Litecoin',
        color: '#345D9D',
        logo: 'https://cdn.simpleicons.org/litecoin/ffffff',
    },
    {
        name: 'USDT',
        color: '#26A17B',
        logo: 'https://cdn.simpleicons.org/tether/ffffff',
    },
    {
        name: 'Amazon Gift',
        color: '#FF9900',
        logo: 'https://cdn.simpleicons.org/amazon/ffffff',
    },
    {
        name: 'Steam',
        color: '#1b2838',
        logo: 'https://cdn.simpleicons.org/steam/ffffff',
    },
];

// Duplicate for seamless infinite loop
const loopItems = [...cashoutMethods, ...cashoutMethods];

const CashoutTicker = () => (
    <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Cashout Via</h2>
            <Link to="/cashout" className="text-xs text-yellow-500 hover:text-yellow-400 transition-colors">
                View all →
            </Link>
        </div>

        {/* Marquee wrapper — overflow hidden + fade edges */}
        <div
            className="marquee-container relative overflow-hidden rounded-2xl"
            style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            }}
        >
            <div className="animate-marquee flex gap-4 w-max py-2">
                {loopItems.map((m, i) => (
                    <div
                        key={`${m.name}-${i}`}
                        className="flex items-center gap-3 px-5 py-3 rounded-xl shrink-0 cursor-pointer transition-all hover:scale-105"
                        style={{
                            background: `${m.color}18`,
                            border: `1px solid ${m.color}40`,
                        }}
                    >
                        <img
                            src={m.logo}
                            alt={m.name}
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                                // fallback to a colored dot if logo fails to load
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                        <span className="text-sm font-semibold text-white whitespace-nowrap">{m.name}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const providers = [
    { name: 'Torox', icon: '🔥', bonus: '+50% Bonus', count: '1,200+ Offers', color: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/30' },
    { name: 'RevU', icon: '🎯', bonus: 'High Payouts', count: '800+ Offers', color: 'from-blue-500/20 to-purple-500/20', border: 'border-blue-500/30' },
    { name: 'AdGate', icon: '⚡', bonus: 'Instant Credit', count: '950+ Offers', color: 'from-yellow-500/20 to-green-500/20', border: 'border-yellow-500/30' },
    { name: 'Lootably', icon: '🎮', bonus: 'Game Offers', count: '600+ Offers', color: 'from-pink-500/20 to-violet-500/20', border: 'border-pink-500/30' },
    { name: 'TheoremReach', icon: '📊', bonus: 'Top Surveys', count: '400+ Surveys', color: 'from-cyan-500/20 to-teal-500/20', border: 'border-cyan-500/30' },
    { name: 'AyeT Studios', icon: '📱', bonus: 'App Installs', count: '500+ Apps', color: 'from-indigo-500/20 to-blue-500/20', border: 'border-indigo-500/30' },
];

const stats = [
    { label: 'Total Paid Out', value: '$452,000+', icon: '💰' },
    { label: 'Active Users', value: '28,400+', icon: '👥' },
    { label: 'Offers Available', value: '5,000+', icon: '📋' },
    { label: 'Avg. Payout Time', value: '< 24 hrs', icon: '⚡' },
];

const HeroSection = ({ isAuthenticated }: { isAuthenticated: boolean }) => (
    <div className="relative overflow-hidden rounded-2xl p-8 md:p-12 mb-8"
        style={{ background: 'linear-gradient(135deg, rgba(234,179,8,0.12) 0%, rgba(202,138,4,0.05) 50%, rgba(10,10,10,0) 100%)', border: '1px solid rgba(234,179,8,0.2)' }}>
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(234,179,8,0.08)' }} />

        <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
                style={{ background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)', color: '#facc15' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Live — 5,000+ tasks available now
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Complete Tasks.<br />
                <span className="gold-text">Get Paid Instantly.</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
                Join thousands of users completing surveys, installing apps, and watching videos to earn real money every day.
            </p>

            {!isAuthenticated ? (
                <div className="flex flex-wrap gap-3">
                    <Link to="/register" className="btn-primary px-8 py-3 text-base font-semibold shadow-lg"
                        style={{ boxShadow: '0 0 20px rgba(163,128,113,0.3)' }}>
                        Start Earning Free
                    </Link>
                    <Link to="/login" className="glass px-8 py-3 rounded-xl text-base font-medium text-white hover:bg-white/10 transition-all">
                        Sign In
                    </Link>
                </div>
            ) : (
                <Link to="/earn" className="btn-primary px-8 py-3 text-base font-semibold inline-block">
                    Browse Tasks →
                </Link>
            )}
        </div>
    </div>
);

export const HomePage = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto">
            {/* Hero */}
            <HeroSection isAuthenticated={isAuthenticated} />

            {/* Cashout Ticker */}
            <CashoutTicker />

            {/* Platform Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {stats.map((s) => (
                    <div key={s.label} className="glass-card text-center py-4">
                        <div className="text-2xl mb-1">{s.icon}</div>
                        <div className="text-xl font-bold text-white">{s.value}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Offerwalls */}
            <div className="mb-10">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-2xl font-bold text-white">Available Offerwalls</h2>
                    <Link to="/earn" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                        View all →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {providers.map((p) => (
                        <Link
                            key={p.name}
                            to={isAuthenticated ? '/earn' : '/register'}
                            className={`glass-card group cursor-pointer bg-gradient-to-br ${p.color} border ${p.border} hover:scale-[1.02] transition-transform`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="text-3xl">{p.icon}</div>
                                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">{p.bonus}</span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                            <p className="text-sm text-gray-400">{p.count}</p>
                            <div className="mt-4 flex items-center text-xs text-primary-400 font-medium group-hover:gap-2 transition-all">
                                Start earning <span className="ml-1">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* How it works */}
            <div className="glass-card">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { step: '01', icon: '📝', title: 'Create Account', desc: 'Sign up for free in under 60 seconds. No credit card needed.' },
                        { step: '02', icon: '🎯', title: 'Complete Tasks', desc: 'Browse hundreds of surveys, app installs, videos, and more.' },
                        { step: '03', icon: '💸', title: 'Get Paid', desc: 'Withdraw via PayPal, gift cards, or crypto. No minimum for most.' },
                    ].map((item) => (
                        <div key={item.step} className="text-center">
                            <div className="text-4xl mb-3">{item.icon}</div>
                            <div className="text-xs font-bold text-primary-400 mb-1">STEP {item.step}</div>
                            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
                {!isAuthenticated && (
                    <div className="text-center mt-8">
                        <Link to="/register" className="btn-primary px-10 py-3 text-base">
                            Join for Free
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};
