import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, X, Trophy, RotateCcw, Brain, TrendingUp, Star, AlertCircle, Lightbulb, Target } from 'lucide-react'
import { curriculum } from '../data'
import { useAppStore } from '../store/useAppStore'

// ─── AI Analysis Engine ──────────────────────────────────────────────────────

interface AIAnalysis {
  emoji: string
  grade: string
  gradeColor: string
  conclusion: string
  strengths: string[]
  improvements: string[]
  tips: string[]
  nextSteps: string
}

function generateAIAnalysis(score: number, total: number, topicTitle: string, wrongCount: number): AIAnalysis {
  const pct = Math.round((score / total) * 100)

  if (pct === 100) {
    return {
      emoji: '🏆',
      grade: 'Mukammal',
      gradeColor: '#f59e0b',
      conclusion: `Ajoyib! Siz "${topicTitle}" mavzusini to'liq va mukammal o'zlashtirdingiz. Barcha ${total} ta savol to'g'ri javoblandi. Bu sizning ushbu sohadagi bilim darajangiz yuqori ekanligini ko'rsatadi.`,
      strengths: [
        "Mavzuning barcha asosiy tushunchalarini chuqur tushunasiz",
        "Terminologiya va ta'riflarni to'g'ri qo'llaysiz",
        "Amaliy va nazariy bilimlar muvozanatda",
      ],
      improvements: [],
      tips: [
        "Keyingi murakkab mavzularga o'ting va bilimingizni kengaytiring",
        "Ushbu mavzu bo'yicha boshqa o'quvchilarga yordam bering",
        "Real loyihalarda ushbu bilimlarni qo'llashga harakat qiling",
      ],
      nextSteps: "Siz tayyor — keyingi mavzuni oching va to'xtovsiz rivojlaning! 🚀",
    }
  }

  if (pct >= 80) {
    return {
      emoji: '⭐',
      grade: "A'lo",
      gradeColor: '#10b981',
      conclusion: `Zo'r natija! "${topicTitle}" mavzusini asosan yaxshi o'zlashtirdingiz. ${score} ta savolga to'g'ri javob berdingiz. Bir necha nuqson mavjud bo'lsa-da, umuman bilim darajangiz yuqori.`,
      strengths: [
        "Mavzuning asosiy konsepsiyalarini yaxshi tushunasiz",
        "Ko'pchilik amaliy savollarni to'g'ri hal qildingiz",
      ],
      improvements: wrongCount > 0
        ? [
            `${wrongCount} ta savol bo'yicha bilimingizni mustahkamlang`,
            "Noto'g'ri javob bergan savollarga qaytib, to'g'ri javobni tahlil qiling",
          ]
        : [],
      tips: [
        "Xato qilgan savollarning to'g'ri javoblarini yodlab qolmasdan, sabab-natija aloqasini tushuning",
        "Testni qayta topshirib, 100% ga yetishga harakat qiling",
        "Mavzuning qo'shimcha materiallari va misollar bilan ishlang",
      ],
      nextSteps: "Biroz ko'proq mashq qilib, ushbu mavzuni mukammal o'zlashtiring, so'ng keyingisiga o'ting! 💪",
    }
  }

  if (pct >= 60) {
    return {
      emoji: '📚',
      grade: 'Yaxshi',
      gradeColor: '#3b82f6',
      conclusion: `Yaxshi boshlang'ich! "${topicTitle}" mavzusini o'rtacha darajada o'zlashtirdingiz. ${score} ta savolga to'g'ri javob berdingiz, ammo bilimlaringizni mustahkamlash va tushunchalarni chuqurlashtirish lozim.`,
      strengths: [
        "Mavzuning asosiy g'oyalarini qisman tushunasiz",
        "Ba'zi muhim tushunchalarni to'g'ri tahlil qila olasiz",
      ],
      improvements: [
        `${total - score} ta savolda qiyinchilik ko'rdingiz — ularni batafsil qayta o'rganing`,
        "Nazariy tushunchalarni amaliy misollar bilan bog'lab o'rganish kerak",
        "Mavzu bo'yicha tushuntirish matnini qayta diqqat bilan o'qib chiqing",
      ],
      tips: [
        "Mavzular sahifasiga qaytib, batafsil tushuntirishni 2-3 marta o'qing",
        "Har bir noto'g'ri javobni tahlil qiling: nima uchun xato qildingiz?",
        "Testni bir necha kun ketma-ket topshirib, bilimni mustahkamlang",
        "Mavzu bo'yicha qo'shimcha manbalar (video, maqolalar) izlang",
      ],
      nextSteps: "Mavzuni qaytadan o'rganing, so'ngra testni qayta topshirib, 80% dan oshirishga harakat qiling! 📖",
    }
  }

  if (pct >= 40) {
    return {
      emoji: '⚠️',
      grade: 'Qoniqarli',
      gradeColor: '#f97316',
      conclusion: `"${topicTitle}" mavzusida qiyinchiliklar mavjud. Faqat ${score} ta savolga to'g'ri javob berdingiz. Bu mavzu sizga qiyin tuyulmoqda — lekin bu normal, ko'proq mashq qilsangiz yaxshi natijalarga erishasiz.`,
      strengths: [
        "Mavzuni o'rganishga kirishganingiz o'zi katta qadam",
        "Ba'zi asosiy tushunchalarni to'g'ri aniqlay oldingiz",
      ],
      improvements: [
        "Mavzuning asosiy terminologiyasini qayta yod oling",
        `${total - score} ta savol jiddiy qayta ko'rib chiqishni talab qiladi`,
        "Har bir tushunchani alohida misol bilan o'rganing",
        "Mavzu bo'yicha video darslar yoki qo'shimcha materiallar qidiring",
      ],
      tips: [
        "Mavzular sahifasidagi batafsil tushuntirishni bosqichma-bosqich o'qing",
        "Har bir atama va tushunchani alohida yozing va takrorlang",
        "Do'stingiz bilan mavzuni muhokama qilib ko'ring",
        "Bir hafta davomida har kuni bir oz vaqt ajrating",
      ],
      nextSteps: "Sabrli bo'ling! Mavzuni yangidan o'rganib, testni qayta topshiring — har doim yaxshilanish mumkin! 💡",
    }
  }

  return {
    emoji: '🔄',
    grade: "Qayta o'rganish kerak",
    gradeColor: '#ef4444',
    conclusion: `"${topicTitle}" mavzusi siz uchun hali yangi va qiyin ko'rinmoqda. Faqat ${score} ta savolga to'g'ri javob berdingiz. Bu sohada asosiy bilimlarni shakllantirishdan boshlash kerak.`,
    strengths: [
      "Testni topshirishga kirishganingiz — bu jasurlik",
    ],
    improvements: [
      "Mavzuning barcha asosiy tushunchalarini yangidan o'rganing",
      "Avvalo, mavzu sarlavhasidagi har bir atamaning ma'nosini aniqlab oling",
      "Batafsil tushuntirishni sekin va diqqat bilan o'qing",
    ],
    tips: [
      "Shoshilmang — bu mavzu katta hajmli va vaqt talab qiladi",
      "Mavzu bo'yicha sodda tildan boshlang: YouTube videolarini ko'ring",
      "Har kuni 15-20 daqiqa ajratib, mavzuni bo'lib-bo'lib o'rganing",
      "Mavzular sahifasidagi tushuntirishni alohida daftarga yozing",
    ],
    nextSteps: "Qaytadan boshlang! Batafsil o'quv materialini o'qib chiqing, keyin testni yana sinab ko'ring! 🌱",
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function QuizPlay() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const { completeTopic } = useAppStore()

  const topic = curriculum.find(t => t.id === Number(topicId))
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [wrongCount, setWrongCount] = useState(0)

  useEffect(() => {
    if (topic) setAnswers(new Array(topic.quizzes.length).fill(null))
  }, [topic])

  if (!topic) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-slate-500 dark:text-white/40">Mavzu topilmadi</p>
        <button onClick={() => navigate('/curriculum')} className="btn-cyber">Mavzularga qaytish</button>
      </div>
    )
  }

  const q = topic.quizzes[current]
  const total = topic.quizzes.length
  const optionLetters = ['A', 'B', 'C', 'D']

  const handleSelect = (idx: number) => {
    if (confirmed) return
    setSelected(idx)
  }

  const handleConfirm = () => {
    if (selected === null) return
    setConfirmed(true)
    const newAnswers = [...answers]
    newAnswers[current] = selected
    setAnswers(newAnswers)
    const isCorrect = q.options[selected] === q.correctAnswer
    if (isCorrect) {
      setScore(s => s + 1)
    } else {
      setWrongCount(w => w + 1)
    }
  }

  const handleNext = () => {
    if (current < total - 1) {
      setCurrent(c => c + 1)
      setSelected(null)
      setConfirmed(false)
    } else {
      setFinished(true)
      completeTopic(topic.id, score, total)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setSelected(null)
    setConfirmed(false)
    setScore(0)
    setFinished(false)
    setWrongCount(0)
    setAnswers(new Array(total).fill(null))
  }

  // ── Finished screen ────────────────────────────────────────────────────────
  if (finished) {
    const pct = Math.round((score / total) * 100)
    const xpEarned = score * 10
    const ai = generateAIAnalysis(score, total, topic.title, wrongCount)

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto space-y-5"
      >
        {/* Score card */}
        <div className="glass-panel p-8 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="text-6xl mb-3"
          >
            {ai.emoji}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div
              className="inline-block px-4 py-1 rounded-full text-sm font-bold mb-3"
              style={{ background: `${ai.gradeColor}15`, color: ai.gradeColor, border: `1px solid ${ai.gradeColor}30` }}
            >
              {ai.grade}
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Test yakunlandi!</h2>
            <p className="text-slate-500 dark:text-white/40 text-sm mb-5 line-clamp-2">{topic.title}</p>

            <div className="text-6xl font-extrabold mb-2">
              <span style={{ color: ai.gradeColor }}>{score}</span>
              <span className="text-slate-300 dark:text-white/20">/{total}</span>
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: ai.gradeColor }}>{pct}%</div>
                <div className="text-xs text-slate-400 dark:text-white/30">To'g'ri</div>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-500 dark:text-cyan-400">+{xpEarned}</div>
                <div className="text-xs text-slate-400 dark:text-white/30">XP</div>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-400 dark:text-white/50">{wrongCount}</div>
                <div className="text-xs text-slate-400 dark:text-white/30">Xato</div>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button onClick={handleRestart} className="btn-cyber flex items-center gap-2">
                <RotateCcw size={14} /> Qayta topshirish
              </button>
              <button onClick={() => navigate('/curriculum')} className="btn-primary">
                Mavzularga qaytish
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── AI Analysis Panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="glass-panel overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 pt-5 pb-4 flex items-center gap-3 border-b border-slate-100 dark:border-white/5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-cyan-500/20 dark:to-purple-500/20 flex items-center justify-center border border-indigo-200/50 dark:border-white/10">
              <Brain size={18} className="text-indigo-500 dark:text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">AI Tahlili va Tavsiyalar</h3>
              <p className="text-[11px] text-slate-400 dark:text-white/30">Natijalaringizga asoslangan aqlli tahlil</p>
            </div>
            <div className="ml-auto flex items-center gap-1 text-[11px] font-medium text-indigo-600 dark:text-cyan-400 bg-indigo-50 dark:bg-cyan-400/10 px-2 py-1 rounded-full border border-indigo-200/50 dark:border-cyan-400/20">
              <Star size={10} />
              AI Powered
            </div>
          </div>

          <div className="p-5 space-y-4">

            {/* AI Conclusion */}
            <div className="rounded-xl p-4" style={{ background: `${ai.gradeColor}08`, border: `1px solid ${ai.gradeColor}20` }}>
              <div className="flex items-start gap-3">
                <Target size={16} style={{ color: ai.gradeColor }} className="mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold mb-1" style={{ color: ai.gradeColor }}>AI Xulosasi</p>
                  <p className="text-sm text-slate-600 dark:text-white/70 leading-relaxed">{ai.conclusion}</p>
                </div>
              </div>
            </div>

            {/* Strengths */}
            {ai.strengths.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={13} className="text-green-500 dark:text-green-400" />
                  <span className="text-xs font-bold text-green-600 dark:text-green-400">Kuchli tomonlaringiz</span>
                </div>
                <div className="space-y-1.5">
                  {ai.strengths.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.65 + i * 0.08 }}
                      className="flex items-start gap-2.5 bg-green-50 dark:bg-green-400/5 border border-green-200/50 dark:border-green-400/15 rounded-lg px-3 py-2"
                    >
                      <Check size={13} className="text-green-500 dark:text-green-400 mt-0.5 shrink-0" />
                      <span className="text-xs text-slate-600 dark:text-white/65 leading-relaxed">{s}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Improvements */}
            {ai.improvements.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={13} className="text-amber-500 dark:text-amber-400" />
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Rivojlantirish kerak bo'lgan sohalar</span>
                </div>
                <div className="space-y-1.5">
                  {ai.improvements.map((imp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.75 + i * 0.08 }}
                      className="flex items-start gap-2.5 bg-amber-50 dark:bg-amber-400/5 border border-amber-200/50 dark:border-amber-400/15 rounded-lg px-3 py-2"
                    >
                      <X size={13} className="text-amber-500 dark:text-amber-400 mt-0.5 shrink-0" />
                      <span className="text-xs text-slate-600 dark:text-white/65 leading-relaxed">{imp}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={13} className="text-purple-500 dark:text-purple-400" />
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">AI Rivojlantirish maslahatlari</span>
              </div>
              <div className="space-y-1.5">
                {ai.tips.map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.85 + i * 0.08 }}
                    className="flex items-start gap-2.5 bg-purple-50 dark:bg-purple-400/5 border border-purple-200/50 dark:border-purple-400/15 rounded-lg px-3 py-2"
                  >
                    <span className="text-purple-500 dark:text-purple-400 font-bold text-xs shrink-0 mt-0.5">{i + 1}.</span>
                    <span className="text-xs text-slate-600 dark:text-white/65 leading-relaxed">{tip}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Next steps */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05 }}
              className="rounded-xl p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-cyan-500/10 dark:to-purple-500/10 border border-indigo-200/40 dark:border-cyan-400/20"
            >
              <div className="flex items-start gap-2.5">
                <ArrowRight size={14} className="text-indigo-500 dark:text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-indigo-600 dark:text-cyan-400 mb-1">Keyingi qadam</p>
                  <p className="text-xs text-slate-500 dark:text-white/60 leading-relaxed">{ai.nextSteps}</p>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>
    )
  }

  // ── Quiz play screen ───────────────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/curriculum')} className="flex items-center gap-2 text-slate-400 dark:text-white/40 hover:text-slate-700 dark:hover:text-white/70 text-sm transition-colors">
          <ArrowLeft size={16} /> Orqaga
        </button>
        <span className="text-xs text-slate-400 dark:text-white/30 font-mono">{current + 1} / {total}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${topic.color}, ${topic.color}88)` }}
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Topic badge */}
      <div className="flex items-center gap-2">
        <span className="text-lg">{topic.icon}</span>
        <span className="text-sm font-medium text-slate-500 dark:text-white/50">{topic.title}</span>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="glass-panel p-8"
        >
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-6 leading-relaxed">{q.questionText}</h2>
          <div className="grid gap-3">
            {q.options.map((opt, idx) => {
              let cls = 'p-4 rounded-xl border text-sm font-medium transition-all duration-300 cursor-pointer text-left w-full flex items-center gap-3 '
              if (!confirmed) {
                cls += selected === idx
                  ? 'bg-indigo-50 border-indigo-300 text-slate-800 shadow-sm shadow-indigo-100 dark:bg-white/[0.08] dark:border-cyan-400/40 dark:text-white dark:shadow-[0_0_20px_rgba(0,240,255,0.1)]'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 dark:bg-white/[0.02] dark:border-white/[0.06] dark:text-white/60 dark:hover:bg-white/[0.05] dark:hover:border-white/[0.12]'
              } else {
                if (q.options[idx] === q.correctAnswer) cls += 'bg-green-50 border-green-300 text-green-700 dark:bg-green-500/10 dark:border-green-400/40 dark:text-green-300'
                else if (idx === selected) cls += 'bg-red-50 border-red-300 text-red-600 dark:bg-red-500/10 dark:border-red-400/40 dark:text-red-300'
                else cls += 'bg-slate-50 border-slate-100 text-slate-400 dark:bg-white/[0.01] dark:border-white/[0.04] dark:text-white/30'
              }
              return (
                <motion.button key={idx} onClick={() => handleSelect(idx)} whileTap={{ scale: 0.98 }} className={cls}>
                  <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center text-xs font-bold shrink-0">
                    {optionLetters[idx]}
                  </span>
                  <span>{opt}</span>
                  {confirmed && q.options[idx] === q.correctAnswer && <Check size={16} className="ml-auto text-green-500 dark:text-green-400" />}
                  {confirmed && idx === selected && q.options[idx] !== q.correctAnswer && <X size={16} className="ml-auto text-red-500 dark:text-red-400" />}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Actions */}
      <div className="flex justify-between">
        <div className="text-sm text-slate-400 dark:text-white/30">Ball: <span className="text-slate-700 dark:text-white/70 font-bold">{score}</span></div>
        {!confirmed ? (
          <button onClick={handleConfirm} disabled={selected === null} className="btn-primary disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2">
            <Check size={14} /> Tasdiqlash
          </button>
        ) : (
          <button onClick={handleNext} className="btn-primary flex items-center gap-2">
            {current < total - 1 ? <><ArrowRight size={14} /> Keyingi</> : <><Trophy size={14} /> Yakunlash</>}
          </button>
        )}
      </div>
    </div>
  )
}
