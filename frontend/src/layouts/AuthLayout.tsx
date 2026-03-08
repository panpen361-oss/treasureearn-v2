import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-dark-background relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md z-10 px-4">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
                        TreasureEarn
                    </h1>
                    <p className="text-gray-400 mt-2 text-center">Complete tasks, earn rewards.</p>
                </div>

                <Outlet />
            </div>
        </div>
    );
};
