import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Landing() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50">
      {/* Navbar */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl">📚</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
              SIMAGENGS
            </span>
          </div>
          <div className="flex items-center gap-6">
            {user ? (
              <>
                <span className="text-gray-700 font-medium">Hi, {user.name}!</span>
                <button 
                  onClick={logout} 
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)]">
        <div className="animate-[fadeIn_0.8s_ease-out]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Sistem Manajemen <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">Magang</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Platform terintegrasi untuk mengelola program magang mahasiswa dengan lebih efisien dan terstruktur.
          </p>
          <div className="flex gap-4 flex-wrap">
            {user ? (
              <Link 
                to="/dashboard" 
                className="px-8 py-4 text-lg rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-8 py-4 text-lg rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  Mulai Sekarang
                </Link>
                <a 
                  href="#features" 
                  className="px-8 py-4 text-lg rounded-lg border-2 border-primary-500 text-primary-600 font-semibold hover:bg-primary-500 hover:text-white transition-all"
                >
                  Pelajari Lebih Lanjut
                </a>
              </>
            )}
          </div>
        </div>

        {/* Floating Cards */}
        <div className="relative h-96 hidden md:block animate-[fadeIn_0.8s_ease-out_0.2s_both]">
          <div className="absolute top-[10%] right-[20%] bg-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 font-semibold text-gray-800 animate-[float_3s_ease-in-out_infinite]">
            <span className="text-2xl">✓</span>
            <span>Daily Log</span>
          </div>
          <div className="absolute top-[45%] right-[5%] bg-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 font-semibold text-gray-800 animate-[float_3s_ease-in-out_1s_infinite]">
            <span className="text-2xl">📊</span>
            <span>Reports</span>
          </div>
          <div className="absolute bottom-[15%] right-[25%] bg-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 font-semibold text-gray-800 animate-[float_3s_ease-in-out_2s_infinite]">
            <span className="text-2xl">👥</span>
            <span>Team</span>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
            Fitur Unggulan
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '📝', title: 'Log Harian', desc: 'Catat aktivitas magang setiap hari dengan mudah dan terstruktur' },
              { icon: '✅', title: 'Manajemen Tugas', desc: 'Kelola dan pantau tugas mahasiswa magang secara real-time' },
              { icon: '🐛', title: 'Bug Tracking', desc: 'Laporkan dan lacak bug dengan sistem yang terintegrasi' },
              { icon: '📅', title: 'Meeting Notes', desc: 'Dokumentasikan hasil meeting dan diskusi dengan tim' },
              { icon: '📊', title: 'Laporan', desc: 'Generate laporan magang secara otomatis dan komprehensif' },
              { icon: '👨‍🏫', title: 'Multi-Role', desc: 'Sistem mendukung admin, supervisor, dosen, dan mahasiswa' },
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border-2 border-transparent hover:border-primary-500 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p>&copy; 2026 SIMAGENGS. All rights reserved.</p>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}