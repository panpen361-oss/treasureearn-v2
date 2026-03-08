import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import { getErrorMessage } from '../utils/error';

type Status = 'verifying' | 'success' | 'error' | 'idle';

export const VerifyIp = () => {
    const { token: pathToken } = useParams();
    const [searchParams] = useSearchParams();
    const token = pathToken || searchParams.get('token');
    const [status, setStatus] = useState<Status>(token ? 'verifying' : 'idle');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!token) return;

        const verify = async () => {
            try {
                const data = await AuthService.verifyIp(token);
                setMessage(data.message);
                setStatus('success');
            } catch (err: any) {
                setMessage(getErrorMessage(err, 'Verification failed. The token may be expired.'));
                setStatus('error');
            }
        };

        verify();
    }, [token]);

    if (!token) {
        return (
            <div className="glass-card text-center p-8">
                <div className="text-5xl mb-4">🛡️</div>
                <h2 className="text-2xl font-bold text-white mb-2">No Token Found</h2>
                <p className="text-gray-400 mb-6">Please click the link from the security email we sent you.</p>
                <Link to="/login" className="btn-primary block py-3">Back to Login</Link>
            </div>
        );
    }

    return (
        <div className="glass-card text-center p-8">
            {status === 'verifying' && (
                <>
                    <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white">Verifying new location...</h2>
                    <p className="text-gray-400 mt-2">Please wait a moment.</p>
                </>
            )}

            {status === 'success' && (
                <>
                    <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
                    <h2 className="text-2xl font-bold text-white mb-2">New Location Approved!</h2>
                    <p className="text-gray-400 mb-6">{message}</p>
                    <Link to="/login" className="btn-primary block py-3">Sign In Now</Link>
                </>
            )}

            {status === 'error' && (
                <>
                    <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✕</div>
                    <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
                    <p className="text-gray-400 mb-6">{message}</p>
                    <Link to="/login" className="btn-primary block py-3">Try Logging In Again</Link>
                </>
            )}
        </div>
    );
};
