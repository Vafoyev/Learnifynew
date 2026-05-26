import { motion } from 'framer-motion'
import { RotateCcw, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'

export default function Settings() {
  const { resetProgress, xp, level, completedTopics, quizResults } = useAppStore()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleReset = () => {
    resetProgress()
    setShowConfirm(false)
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold">
          <span className="cyber-gradient-text">Sozlamalar</span>
        </motion.h1>
        <p className="text-slate-500 dark:text-white/40 text-sm mt-1">O'quv sozlamalaringizni boshqaring</p>
      </div>

      {/* Stats Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6">
        <h2 className="text-sm font-semibold text-slate-800 dark:text-white/70 mb-4">Sizning statistikangiz</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-transparent">
            <span className="text-slate-500 dark:text-white/40">Jami XP</span>
            <span className="text-slate-800 dark:text-white/80 font-bold">{xp}</span>
          </div>
          <div className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-transparent">
            <span className="text-slate-500 dark:text-white/40">Daraja</span>
            <span className="text-slate-800 dark:text-white/80 font-bold">{level}</span>
          </div>
          <div className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-transparent">
            <span className="text-slate-500 dark:text-white/40">Mavzular</span>
            <span className="text-slate-800 dark:text-white/80 font-bold">{completedTopics.length}/30</span>
          </div>
          <div className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-transparent">
            <span className="text-slate-500 dark:text-white/40">Testlar soni</span>
            <span className="text-slate-800 dark:text-white/80 font-bold">{quizResults.length}</span>
          </div>
        </div>
      </motion.div>

      {/* About */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6">
        <h2 className="text-sm font-semibold text-slate-800 dark:text-white/70 mb-3">Platforma haqida</h2>
        <p className="text-xs text-slate-500 dark:text-white/30 leading-relaxed">
          Lernify CS — 30 ta mavzu va 300 ta savoldan iborat gamifikatsiyalashtirilgan Informatika va Axborot texnologiyalari o'quv platformasi. React, TypeScript, Tailwind CSS, Framer Motion va Zustand texnologiyalari asosida yaratilgan.
        </p>
      </motion.div>

      {/* Reset */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 border-red-200/50 dark:border-red-500/10">
        <h2 className="text-sm font-semibold text-red-500 dark:text-red-400/70 mb-3">Xavfli zona</h2>
        {!showConfirm ? (
          <button onClick={() => setShowConfirm(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 dark:text-red-400/70 bg-red-50 dark:bg-red-500/5 border border-red-200/50 dark:border-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/10 transition-all">
            <RotateCcw size={14} /> Barcha natijalarni tozalash
          </button>
        ) : (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/5 border border-red-200/50 dark:border-red-500/15 space-y-3">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
              <AlertTriangle size={16} /> Bu barcha natijalaringizni o'chirib yuboradi!
            </div>
            <div className="flex gap-2">
              <button onClick={handleReset} className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 dark:bg-red-500/20 text-white dark:text-red-300 hover:bg-red-600 dark:hover:bg-red-500/30 transition-colors">
                Tasdiqlash
              </button>
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/50 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                Bekor qilish
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
