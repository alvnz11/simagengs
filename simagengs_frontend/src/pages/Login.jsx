import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-emerald-50 p-8">
      <div className="bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 max-w-5xl w-full overflow-hidden animate-[fadeInUp_0.6s_ease-out]">
        {/* Left Side - Form */}
        <div className="p-12 flex flex-col">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-500 font-medium mb-8 transition-colors">
            <span>←</span> Kembali ke Home
          </Link>
          
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl">📚</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                SIMAGENGS
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Selamat Datang</h1>
            <p className="text-gray-600">Masuk ke akun Anda untuk melanjutkan</p>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                <span className="text-xl">⚠</span>
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-semibold text-gray-700 text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                required
                disabled={loading}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-semibold text-gray-700 text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
                disabled={loading}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Belum punya akun? <a href="#contact" className="text-primary-500 font-semibold hover:underline">Hubungi Admin</a></p>
          </div>
        </div>

        {/* Right Side - Promotional */}
        <div className="hidden md:flex bg-gradient-to-br from-primary-500 to-primary-600 p-12 items-center justify-center relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-24 -right-24"></div>
          <div className="absolute w-48 h-48 bg-white/10 rounded-full -bottom-12 -left-12"></div>
          <div className="absolute w-36 h-36 bg-white/10 rounded-full top-1/2 left-[10%] animate-[float_4s_ease-in-out_infinite]"></div>
          
          <div className="relative z-10 text-white">
            <h2 className="text-3xl font-extrabold mb-8 leading-snug">
              Kelola Program Magang dengan Lebih Mudah
            </h2>
            <ul className="space-y-6 text-lg">
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center font-bold">
                  ✓
                </span>
                <span>Sistem terintegrasi untuk semua role</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center font-bold">
                  ✓
                </span>
                <span>Real-time monitoring dan reporting</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center font-bold">
                  ✓
                </span>
                <span>Interface yang mudah digunakan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}