import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'

const allAchievements = [
  { id: 'first_quiz', title: 'Birinchi qadam', desc: 'Birinchi testni topshiring', icon: '🎯', color: '#0ea5e9', darkColor: '#00f0ff' },
  { id: 'five_topics', title: 'Boshlanish', desc: '5 ta mavzuni tugallang', icon: '📗', color: '#22c55e', darkColor: '#22c55e' },
  { id: 'ten_topics', title: 'Yarmiga yetdingiz', desc: '10 ta mavzuni tugallang', icon: '📘', color: '#3b82f6', darkColor: '#3b82f6' },
  { id: 'twenty_topics', title: 'Deyarli usta', desc: '20 ta mavzuni tugallang', icon: '📙', color: '#f97316', darkColor: '#f97316' },
  { id: 'all_topics', title: 'Informatika ustasi', desc: 'Barcha 30 ta mavzuni tugallang', icon: '👑', color: '#d97706', darkColor: '#facc15' },
  { id: 'xp_100', title: 'XP yig\'uvchi', desc: '100 XP to\'plang', icon: '⚡', color: '#8b5cf6', darkColor: '#a855f7' },
  { id: 'xp_500', title: 'XP jangchisi', desc: '500 XP to\'plang', icon: '🔥', color: '#ef4444', darkColor: '#ef4444' },
  { id: 'xp_1000', title: 'XP afsonasi', desc: '1000 XP to\'plang', icon: '💎', color: '#06b6d4', darkColor: '#06b6d4' },
  { id: 'xp_2000', title: 'XP xudosi', desc: '2000 XP to\'plang', icon: '🌟', color: '#d97706', darkColor: '#facc15' },
  { id: 'perfect_score', title: 'Mukammallik', desc: 'Testda 10/10 to\'plang', icon: '💯', color: '#22c55e', darkColor: '#22c55e' },
  { id: 'streak_3', title: 'Alangada', desc: '3 kunlik seriya', icon: '🔥', color: '#f97316', darkColor: '#f97316' },
  { id: 'streak_7', title: 'To\'xtab bo\'lmas', desc: '7 kunlik seriya', icon: '🚀', color: '#ec4899', darkColor: '#ec4899' },
]

export default function Achievements() {
  const { achievements } = useAppStore()

  return (
    <div className="space-y-8">
      <div>
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold">
          <span className="cyber-gradient-text">Yutuqlar</span>
        </motion.h1>
        <p className="text-slate-500 dark:text-white/40 text-sm mt-1">{achievements.length}/{allAchievements.length} ochilgan</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allAchievements.map((a, i) => {
          const unlocked = achievements.includes(a.id)
          const isDark = document.documentElement.classList.contains('dark')
          const activeColor = isDark ? a.darkColor : a.color

          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`glass-panel p-6 relative overflow-hidden transition-all duration-500 ${unlocked ? 'ring-1' : 'opacity-50 dark:opacity-40'}`}
              style={unlocked ? { borderColor: `${activeColor}30`, boxShadow: `0 0 30px ${activeColor}10` } : {}}
            >
              {unlocked && <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-full transition-colors" style={{ background: `${activeColor}10` }} />}
              <div className="text-4xl mb-3">{a.icon}</div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white/90">{a.title}</h3>
              <p className="text-xs text-slate-500 dark:text-white/30 mt-1">{a.desc}</p>
              {unlocked ? (
                <span className="inline-block mt-3 text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors" style={{ background: `${activeColor}20`, color: activeColor }}>OCHILGAN</span>
              ) : (
                <span className="inline-block mt-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20">YOPIQ</span>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
