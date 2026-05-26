import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Lock, ChevronDown, BookOpen, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { curriculum } from '../data'
import { useAppStore } from '../store/useAppStore'
import { getTopicExplanation } from '../data/topicExplanations'

function renderExplanation(text: string) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    if (line.startsWith('### ')) {
      return (
        <h3 key={i} className="text-base font-bold text-indigo-600 dark:text-cyan-400 mt-6 mb-2 flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-indigo-500 dark:bg-cyan-400 inline-block" />
          {line.replace('### ', '')}
        </h3>
      )
    }
    if (line.startsWith('**') && line.endsWith('**')) {
      return (
        <p key={i} className="text-slate-700 dark:text-white/80 font-semibold text-sm mt-3">
          {line.replace(/\*\*/g, '')}
        </p>
      )
    }
    const boldParts = line.split(/\*\*(.*?)\*\*/g)
    if (boldParts.length > 1) {
      return (
        <p key={i} className="text-slate-600 dark:text-white/65 text-sm leading-relaxed mb-1">
          {boldParts.map((part, j) =>
            j % 2 === 1
              ? <strong key={j} className="text-slate-800 dark:text-white/90 font-semibold">{part}</strong>
              : part
          )}
        </p>
      )
    }
    if (line.startsWith('- ')) {
      return (
        <li key={i} className="text-slate-600 dark:text-white/60 text-sm ml-4 list-disc leading-relaxed">
          {line.replace('- ', '')}
        </li>
      )
    }
    if (line.match(/^\d+\. /)) {
      return (
        <li key={i} className="text-slate-600 dark:text-white/60 text-sm ml-4 list-decimal leading-relaxed">
          {line.replace(/^\d+\. /, '')}
        </li>
      )
    }
    if (line.trim() === '') return <div key={i} className="h-1" />
    return (
      <p key={i} className="text-slate-600 dark:text-white/60 text-sm leading-relaxed mb-1">
        {line}
      </p>
    )
  })
}

export default function Curriculum() {
  const navigate = useNavigate()
  const { completedTopics } = useAppStore()
  const [openId, setOpenId] = useState<number | null>(null)

  const toggle = (id: number) => {
    setOpenId(prev => (prev === id ? null : id))
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold"
        >
          <span className="cyber-gradient-text">Mavzular</span>
        </motion.h1>
        <p className="text-slate-500 dark:text-white/40 text-sm mt-1">
          📖 Har bir mavzuni o'rganib, so'ngra testni topshiring
        </p>
      </div>

      {/* Progress summary */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-4 flex items-center gap-4"
      >
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-white/40">Umumiy progress</span>
            <span className="text-xs font-bold text-indigo-600 dark:text-cyan-400">
              {completedTopics.length} / {curriculum.length}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-cyan-400 dark:to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${(completedTopics.length / curriculum.length) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
        <BookOpen size={20} className="text-slate-300 dark:text-white/20 shrink-0" />
      </motion.div>

      {/* Topic list */}
      <div className="grid gap-3">
        {curriculum.map((topic, i) => {
          const done = completedTopics.includes(topic.id)
          const isOpen = openId === topic.id

          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.025 }}
              className="glass-panel overflow-hidden"
              style={{ borderColor: isOpen ? `${topic.color}40` : undefined }}
            >
              {/* Topic header row */}
              <button
                onClick={() => toggle(topic.id)}
                className="w-full p-4 flex items-center gap-4 group text-left transition-all hover:bg-slate-50/50 dark:hover:bg-white/[0.03]"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: `${topic.color}15`, border: `1px solid ${topic.color}30` }}
                >
                  {topic.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono text-slate-400 dark:text-white/20">
                      #{String(topic.id).padStart(2, '0')}
                    </span>
                    {done && (
                      <span className="text-[10px] font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-400/10 px-2 py-0.5 rounded-full">
                        ✓ Bajarildi
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-white/90 leading-snug line-clamp-2">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-white/30 mt-0.5 truncate">{topic.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {done
                    ? <CheckCircle size={16} className="text-green-500 dark:text-green-400" />
                    : <Lock size={13} className="text-slate-300 dark:text-white/15" />
                  }
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown size={16} className="text-slate-400 dark:text-white/30 group-hover:text-slate-600 dark:group-hover:text-white/60 transition-colors" />
                  </motion.div>
                </div>
              </button>

              {/* Accordion explanation panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    {/* Divider */}
                    <div
                      className="mx-4 h-px"
                      style={{ background: `linear-gradient(90deg, transparent, ${topic.color}30, transparent)` }}
                    />

                    <div className="px-5 pt-4 pb-2">
                      {/* Explanation text */}
                      <div className="rounded-xl p-4 mb-4"
                        style={{ background: `${topic.color}08`, border: `1px solid ${topic.color}15` }}>
                        <div className="prose prose-sm max-w-none">
                          {renderExplanation(getTopicExplanation(topic.id))}
                        </div>
                      </div>

                      {/* Quiz info bar */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-white/30">
                          <span>🧩</span>
                          <span>{topic.quizzes.length} ta test savoli</span>
                          {done && (
                            <span className="text-green-500 dark:text-green-400">• Avval topshirilgan</span>
                          )}
                        </div>
                      </div>

                      {/* Start quiz button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate(`/quiz/${topic.id}`)}
                        className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mb-4 transition-all"
                        style={{
                          background: `linear-gradient(135deg, ${topic.color}20, ${topic.color}10)`,
                          border: `1px solid ${topic.color}40`,
                          color: topic.color,
                          boxShadow: `0 2px 15px ${topic.color}15`,
                        }}
                      >
                        <Zap size={15} />
                        {done ? 'Testni qayta topshirish 🔄' : "Mavzu bo'yicha testni boshlash 🚀"}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
