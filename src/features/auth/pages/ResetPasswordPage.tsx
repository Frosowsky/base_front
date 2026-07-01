import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../../lib/api';
import { Lock, ArrowRight, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    if (password !== confirmPassword) {
      setStatusMsg({ type: 'error', text: 'Hasła nie są takie same.' });
      return;
    }

    setIsLoading(true);

    try {
      await api.post('/api/auth/reset-password', { email, token, newPassword: password });
      setStatusMsg({ type: 'success', text: 'Hasło zostało pomyślnie zmienione!' });
      
      // Przekieruj na logowanie po 3 sekundach
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.response?.data?.message || 'Wystąpił błąd podczas resetowania hasła.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!email || !token) {
    return (
      <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl border border-red-100">
           <ShieldCheck className="w-12 h-12 text-red-500 mx-auto mb-4" />
           <h2 className="text-xl font-bold text-gray-900 mb-2">Nieprawidłowy link</h2>
           <p className="text-gray-500 mb-6">Link do resetowania hasła jest nieprawidłowy lub wygasł.</p>
           <Link to="/forgot-password" className="text-emerald-600 font-bold hover:underline">Zażądaj nowego linku</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 shadow-xl shadow-emerald-200 mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ustaw nowe hasło</h1>
          <p className="text-gray-500">Dla konta: <strong className="text-gray-700">{email}</strong></p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
          {statusMsg?.type === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              {statusMsg.text}
            </div>
          )}

          {statusMsg?.type === 'success' ? (
             <div className="text-center py-4">
               <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <CheckCircle2 className="w-8 h-8 text-emerald-600" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">{statusMsg.text}</h3>
               <p className="text-gray-500 text-sm mb-6">Za chwilę zostaniesz przekierowany do strony logowania...</p>
               <Link to="/login" className="text-emerald-600 font-bold hover:underline">Przejdź teraz</Link>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nowe Hasło</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border-0 text-gray-900 rounded-xl ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition-shadow text-sm"
                    placeholder="Min. 8 znaków"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Powtórz Nowe Hasło</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border-0 text-gray-900 rounded-xl ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition-shadow text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-4 px-4 rounded-xl hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all disabled:opacity-70 shadow-lg shadow-emerald-200"
              >
                {isLoading ? 'Zapisywanie...' : (
                  <>
                    Zmień hasło <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
