import { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import { getErrorMessage } from '../utils/error';

export const ResetPassword = () => {
    const { token: pathToken } = useParams();
    const [searchParams] = useSearchParams();
    const token = pathToken || searchParams.get('token');

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            setError('Missing reset token. Please use the link from your email.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            await AuthService.resetPassword(token, formData.password);
            setSuccess(true);
        } catch (err: any) {
            setError(getErrorMessage(err, 'Failed to reset password. The link may be expired.'));
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="glass-card text-center p-8">
                <div className="text-5xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-white mb-2">Invalid Request</h2>
                <p className="text-gray-400 mb-6">No reset token was found in the URL.</p>
                <Link to="/forgot-password" className="btn-primary block py-3">Back to Forgot Password</Link>
            </div>
        );
    }

    if (success) {
        return (
            <div className="glass-card text-center p-8">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
                <h2 className="text-2xl font-bold text-white mb-2">Password Reset Successful!</h2>
                <p className="text-gray-400 mb-6">Your password has been updated. You can now login with your new password.</p>
                <Link to="/login" className="btn-primary block w-full py-3">Sign In Now</Link>
            </div>
        );
    }

    return (
        <div className="glass-card w-full">
            <div className="text-center mb-8">
                <div className="text-4xl mb-3">🛡️</div>
                <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
                <p className="text-gray-400 text-sm">Choose a strong new password for your account.</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-between">
                    <p className="text-red-400 text-sm">{error}</p>
                    <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">×</button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">New Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        minLength={8}
                        value={formData.password}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="••••••••"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        minLength={8}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full py-3 text-lg"
                >
                    {isLoading ? 'Updating...' : 'Update Password'}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
                Wait, I remember it!{' '}
                <Link to="/login" className="text-primary-500 hover:text-primary-400 font-medium transition-colors">
                    Back to Login
                </Link>
            </div>
        </div>
    );
};
