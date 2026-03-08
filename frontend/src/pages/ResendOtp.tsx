import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import { getErrorMessage } from '../utils/error';

export const ResendOtp = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await AuthService.sendOtp(email);
            setSuccess(true);
        } catch (err: any) {
            setError(getErrorMessage(err, 'Failed to send. Please try again.'));
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="glass-card text-center p-8">
                <div className="text-5xl mb-4">📧</div>
                <h2 className="text-2xl font-bold text-white mb-2">Email Sent!</h2>
                <p className="text-gray-400 mb-6">
                    A verification link has been sent to <strong className="text-white">{email}</strong>. Please check your inbox (and spam folder).
                </p>
                <Link to="/login" className="btn-primary block py-3">Back to Login</Link>
            </div>
        );
    }

    return (
        <div className="glass-card w-full">
            <div className="text-center mb-8">
                <div className="text-4xl mb-3">📨</div>
                <h2 className="text-2xl font-bold text-white mb-2">Resend Verification</h2>
                <p className="text-gray-400 text-sm">Enter your email and we'll send a new verification link.</p>
            </div>

            {error && (
                <div className="mb-5 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-between">
                    <p className="text-red-400 text-sm">{error}</p>
                    <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300 ml-2">×</button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                        placeholder="you@example.com"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full py-3 text-lg"
                >
                    {isLoading ? 'Sending...' : 'Send Verification Email'}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
                <Link to="/login" className="text-primary-500 hover:text-primary-400 transition-colors">← Back to Login</Link>
            </div>
        </div>
    );
};
