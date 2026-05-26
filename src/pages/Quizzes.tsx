import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Play, CheckCircle } from 'lucide-react'
import { curriculum } from '../data'
import { useAppStore } from '../store/useAppStore'

export default function Quizzes() {
  const navigate = useNavigate()
  const { completedTopics, quizResults } = useAppStore()

  return (
    <div className="space-y-8">
      <div>
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold">
          <span className="cyber-gradient-text">Testlar</span>
        </motion.h1>
        <p className="text-slate-500 dark:text-white/40 text-sm mt-1">Barcha mavzular bo'yicha bilimingizni sinang</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {curriculum.map((topic, i) => {
          const done = completedTopics.includes(topic.id)
          const results = quizResults.filter(r => r.topicId === topic.id)
          const bestScore = results.length > 0 ? Math.max(...results.map(r => r.score)) : null

          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="glass-panel-hover p-6 cursor-pointer group"
              onClick={() => navigate(`/quiz/${topic.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-white dark:bg-transparent"
                  style={{ 
                    background: document.documentElement.classList.contains('dark') ? `${topic.color}12` : `${topic.color}15`, 
                    border: `1px solid ${topic.color}20` 
                  }}
                >
                  {topic.icon}
                </div>
                {done && <CheckCircle size={18} className="text-green-500 dark:text-green-400" />}
              </div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-white/90 mb-1">{topic.title}</h3>
              <p className="text-xs text-slate-500 dark:text-white/30 mb-4">{topic.quizzes.length} ta savol</p>
              <div className="flex items-center justify-between">
                {bestScore !== null ? (
                  <span className="text-xs text-slate-500 dark:text-white/40">Eng yaxshi: {bestScore}/{topic.quizzes.length}</span>
                ) : (
                  <span className="text-xs text-slate-400 dark:text-white/20">Hali topshirilmagan</span>
                )}
                <div className="flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: topic.color }}>
                  <Play size={12} /> Boshlash
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
