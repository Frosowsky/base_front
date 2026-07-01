import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../lib/api';
import { Mail, ArrowRight, Activity, ShieldCheck } from 'lucide-react';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error', text: string, devLink?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    setIsLoading(true);

    try {
      const response = await api.post('/api/auth/forgot-password', { email });
      setStatusMsg({ 
        type: 'success', 
        text: response.data.message,
        devLink: response.data.devResetLink // ONLY FOR DEV
      });
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.response?.data?.message || 'Wystąpił błąd serwera.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-[-20%] right-[20%] w-[40%] h-[40%] bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 shadow-xl shadow-emerald-200 mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Zapomniałeś hasła?</h1>
          <p className="text-gray-500">Podaj adres e-mail przypisany do Twojego konta, a wyślemy Ci link do resetowania hasła.</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
          {statusMsg?.type === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              {statusMsg.text}
            </div>
          )}

          {statusMsg?.type === 'success' ? (
            <div className="text-center">
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 text-sm font-medium">
                {statusMsg.text}
              </div>
              {statusMsg.devLink && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800 text-xs font-mono break-all text-left">
                  <strong className="block mb-1">DEV MODE - Link do resetu:</strong>
                  <Link to={statusMsg.devLink} className="text-blue-600 hover:underline">
                    Kliknij tutaj aby zresetować hasło (Symulacja E-maila)
                  </Link>
                </div>
              )}
              <Link
                to="/login"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-4 px-4 rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-200"
              >
                Wróć do logowania
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Adres Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border-0 text-gray-900 rounded-xl ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition-shadow text-sm"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-4 px-4 rounded-xl hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all disabled:opacity-70 shadow-lg shadow-emerald-200"
              >
                {isLoading ? 'Wysyłanie...' : (
                  <>
                    Wyślij link <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}

          {!statusMsg?.type && (
            <p className="mt-8 text-center text-sm text-gray-500 font-medium">
              Pamiętasz hasło?{' '}
              <Link to="/login" className="text-emerald-600 hover:text-emerald-500 font-bold transition-colors">
                Wróć do logowania
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
