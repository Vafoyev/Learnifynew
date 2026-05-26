import { motion } from 'framer-motion'
import { Crown, Medal, TrendingUp } from 'lucide-react'

const mockUsers = [
  { name: 'Aziz Karimov', xp: 2850, level: 29, avatar: '🧑‍💻', topics: 28 },
  { name: 'Madina Rahimova', xp: 2640, level: 27, avatar: '👩‍💻', topics: 26 },
  { name: 'Sardor Toshev', xp: 2200, level: 23, avatar: '👨‍💻', topics: 22 },
  { name: 'Nilufar Aliyeva', xp: 1980, level: 20, avatar: '👩‍🎓', topics: 19 },
  { name: 'Jasur Nazarov', xp: 1750, level: 18, avatar: '🧑‍🎓', topics: 17 },
  { name: 'Dilorom Umarova', xp: 1500, level: 16, avatar: '👩‍🔬', topics: 15 },
  { name: 'Bobur Xasanov', xp: 1200, level: 13, avatar: '👨‍🔬', topics: 12 },
  { name: 'Zulfiya Ergasheva', xp: 950, level: 10, avatar: '👩‍💼', topics: 9 },
  { name: 'Siz', xp: 0, level: 1, avatar: '🎯', topics: 0, isYou: true },
  { name: 'Otabek Mirzayev', xp: 400, level: 5, avatar: '🧑‍💼', topics: 4 },
]

export default function Leaderboard() {
  const rankColors = ['#d97706', '#64748b', '#b45309']

  return (
    <div className="space-y-8">
      <div>
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold">
          <span className="cyber-gradient-text">Reyting</span>
        </motion.h1>
        <p className="text-slate-400 text-sm mt-1">Boshqa o'quvchilar bilan raqobatlashing</p>
      </div>

      {/* Top 3 */}
      <div className="grid grid-cols-3 gap-4">
        {mockUsers.slice(0, 3).map((u, i) => (
          <motion.div
            key={u.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`glass-panel p-6 text-center ${i === 0 ? 'ring-1 ring-amber-300/40' : ''}`}
          >
            <div className="text-4xl mb-3">{u.avatar}</div>
            {i === 0 ? <Crown size={20} className="mx-auto mb-2 text-amber-500" /> : <Medal size={18} className="mx-auto mb-2" style={{ color: rankColors[i] }} />}
            <p className="text-sm font-semibold text-slate-800">{u.name}</p>
            <p className="text-xs text-slate-400 mt-1">{u.xp.toLocaleString()} XP</p>
            <p className="text-xs mt-1 font-bold" style={{ color: rankColors[i] }}>#{i + 1}</p>
          </motion.div>
        ))}
      </div>

      {/* Full List */}
      <div className="glass-panel overflow-hidden">
        <div className="grid grid-cols-[50px_1fr_80px_80px_60px] gap-2 px-5 py-3 border-b border-slate-100 text-xs text-slate-400 font-medium">
          <span>O'rin</span><span>O'quvchi</span><span>XP</span><span>Mavzu</span><span>Drj</span>
        </div>
        {mockUsers.map((u, i) => (
          <motion.div
            key={u.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`grid grid-cols-[50px_1fr_80px_80px_60px] gap-2 px-5 py-3 items-center border-b border-slate-50 text-sm ${(u as any).isYou ? 'bg-indigo-50/60 border-indigo-100' : ''}`}
          >
            <span className="font-bold text-slate-400" style={i < 3 ? { color: rankColors[i] } : {}}>#{i + 1}</span>
            <div className="flex items-center gap-2">
              <span>{u.avatar}</span>
              <span className={`font-medium ${(u as any).isYou ? 'text-indigo-600' : 'text-slate-700'}`}>{u.name}</span>
            </div>
            <span className="text-slate-500 font-mono text-xs">{u.xp.toLocaleString()}</span>
            <span className="text-slate-400 text-xs">{u.topics}/30</span>
            <span className="text-slate-400 text-xs">{u.level}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
