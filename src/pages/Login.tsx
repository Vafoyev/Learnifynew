import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogIn, User, Mail, GraduationCap } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

export default function Login() {
  const { login, teachers } = useAppStore()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [teacherId, setTeacherId] = useState(teachers[0]?.id || 1)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!email.trim() || !email.includes('@')) errs.email = 'To\'g\'ri email kiriting'
    if (!firstName.trim()) errs.firstName = 'Ismingizni kiriting'
    if (!lastName.trim()) errs.lastName = 'Familiyangizni kiriting'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    login({ email: email.trim(), firstName: firstName.trim(), lastName: lastName.trim(), teacherId })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f0f4ff] to-[#faf5ff] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            <span className="cyber-gradient-text">Lernify</span>
            <span className="text-slate-500 ml-2">CS</span>
          </h1>
          <p className="text-slate-400 text-sm">Informatika va Axborot texnologiyalari</p>
        </motion.div>

        {/* Login Card */}
        <div className="glass-panel p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-800 mb-1">Kirish</h2>
            <p className="text-slate-400 text-xs">Ma'lumotlaringizni kiriting</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block font-medium">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm placeholder:text-slate-300 focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* First Name */}
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block font-medium">Ism</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ismingiz"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm placeholder:text-slate-300 focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block font-medium">Familiya</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Familiyangiz"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm placeholder:text-slate-300 focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>

            {/* Teacher Selection */}
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block font-medium">O'qituvchi</label>
              <div className="relative">
                <GraduationCap size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                <select
                  value={teacherId}
                  onChange={(e) => setTeacherId(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all appearance-none cursor-pointer"
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id} className="bg-white text-slate-800">
                      {t.avatar} {t.name} — {t.subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-shadow"
            >
              <LogIn size={16} /> Kirish
            </motion.button>
          </form>
        </div>

        <p className="text-center text-slate-300 text-[10px] mt-6">
          Lernify CS v1.0  Urganch Davlat Universiteti
        </p>
      </motion.div>
    </div>
  )
}
