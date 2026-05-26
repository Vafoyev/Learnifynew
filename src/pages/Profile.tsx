import { motion } from 'framer-motion'
import { User, Mail, GraduationCap, Zap, BookOpen, Trophy, LogOut } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { user, teachers, xp, level, completedTopics, quizResults, logout } = useAppStore()
  const navigate = useNavigate()

  if (!user) return null

  const teacher = teachers.find(t => t.id === user.teacherId)
  const avgScore = quizResults.length > 0
    ? Math.round(quizResults.reduce((a, r) => a + (r.score / r.totalQuestions) * 100, 0) / quizResults.length)
    : 0

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold">
          <span className="cyber-gradient-text">Profil</span>
        </motion.h1>
        <p className="text-slate-400 text-sm mt-1">Shaxsiy ma'lumotlaringiz</p>
      </div>

      {/* Profile Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 border border-indigo-200/50 flex items-center justify-center text-2xl font-bold text-indigo-600">
            {initials}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{user.firstName} {user.lastName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Mail size={13} className="text-slate-400" />
              <span className="text-sm text-slate-500">{user.email}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200/50">
                Daraja {level}
              </span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <User size={14} className="text-indigo-500" />
              <span className="text-xs text-slate-400">To'liq ism</span>
            </div>
            <p className="text-sm font-medium text-slate-700">{user.firstName} {user.lastName}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <Mail size={14} className="text-blue-500" />
              <span className="text-xs text-slate-400">Email</span>
            </div>
            <p className="text-sm font-medium text-slate-700">{user.email}</p>
          </div>
        </div>
      </motion.div>

      {/* Teacher Info */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <GraduationCap size={16} className="text-purple-500" /> O'qituvchi
        </h3>
        {teacher && (
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200/50 flex items-center justify-center text-2xl">
              {teacher.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">{teacher.name}</p>
              <p className="text-xs text-slate-400">{teacher.subject}</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">O'quv natijalari</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="text-center p-3 rounded-xl bg-slate-50">
            <Zap size={18} className="mx-auto mb-1 text-indigo-500" />
            <p className="text-lg font-bold text-slate-800">{xp}</p>
            <p className="text-[10px] text-slate-400">XP</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-slate-50">
            <BookOpen size={18} className="mx-auto mb-1 text-blue-500" />
            <p className="text-lg font-bold text-slate-800">{completedTopics.length}/30</p>
            <p className="text-[10px] text-slate-400">Mavzular</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-slate-50">
            <Trophy size={18} className="mx-auto mb-1 text-amber-500" />
            <p className="text-lg font-bold text-slate-800">{quizResults.length}</p>
            <p className="text-[10px] text-slate-400">Testlar</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-slate-50">
            <div className="text-lg mx-auto mb-1">📊</div>
            <p className="text-lg font-bold text-slate-800">{avgScore}%</p>
            <p className="text-[10px] text-slate-400">O'rtacha</p>
          </div>
        </div>
      </motion.div>

      {/* Logout */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-red-500 bg-red-50 border border-red-200/50 hover:bg-red-100 transition-all"
        >
          <LogOut size={14} /> Chiqish
        </button>
      </motion.div>
    </div>
  )
}
