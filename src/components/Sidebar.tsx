import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Rocket, BookOpen, Brain, Code2, Trophy, Medal, Settings, X, Menu, UserCircle
} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const navItems = [
  { to: '/', icon: Rocket, label: '🚀 Bosh sahifa' },
  { to: '/curriculum', icon: BookOpen, label: '📚 Mavzular' },
  { to: '/quizzes', icon: Brain, label: '🧠 Testlar' },
  { to: '/code-lab', icon: Code2, label: '💻 Kod laboratoriyasi' },
  { to: '/leaderboard', icon: Trophy, label: '🏆 Reyting' },
  { to: '/achievements', icon: Medal, label: '🎖 Yutuqlar' },
  { to: '/profile', icon: UserCircle, label: '👤 Profil' },
  { to: '/settings', icon: Settings, label: '⚙️ Sozlamalar' },
]

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { user, teachers } = useAppStore()
  const teacher = user ? teachers.find(t => t.id === user.teacherId) : null

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Mobile toggle */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-xl bg-white/80 backdrop-blur-xl border border-slate-200 text-slate-700 shadow-sm"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[260px] glass-sidebar z-50 flex flex-col py-8 px-4 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-10 px-2"
        >
          <h1 className="text-2xl font-extrabold tracking-tight">
            <span className="cyber-gradient-text">Lernify</span>
            <span className="text-slate-500 ml-1">CS</span>
          </h1>
          <p className="text-[11px] text-slate-400 mt-1 tracking-widest uppercase">
            O'quv platformasi
          </p>
        </motion.div>

        <nav className="flex-1 flex flex-col gap-1">
          {navItems.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => {
                if (window.innerWidth < 1024) onToggle()
              }}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 w-full"
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </motion.div>
            </NavLink>
          ))}
        </nav>

        {/* User info at bottom */}
        <div className="px-2 pt-4 border-t border-slate-200/60">
          {user ? (
            <NavLink to="/profile" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-xs font-bold text-indigo-600 border border-indigo-200/50">
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-600 truncate group-hover:text-slate-900 transition-colors">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {teacher ? teacher.name : 'O\'quvchi'}
                </p>
              </div>
            </NavLink>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-sm font-bold text-indigo-600">
                CS
              </div>
              <div>
                <p className="text-xs font-medium text-slate-600">O'quvchi</p>
                <p className="text-[10px] text-slate-400">v1.0.0</p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
