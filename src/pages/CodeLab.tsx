import { motion } from 'framer-motion'
import { Play, Terminal, FileCode, FolderOpen } from 'lucide-react'

const sampleCode = `// Lernify CS Kod laboratoriyasiga xush kelibsiz
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Birinchi 10 ta fibonacci sonini hisoblash
for (let i = 0; i < 10; i++) {
  console.log(\`fib(\${i}) = \${fibonacci(i)}\`);
}

// Natija:
// fib(0) = 0
// fib(1) = 1
// fib(2) = 1
// fib(3) = 2
// fib(4) = 3
// fib(5) = 5
// fib(6) = 8
// fib(7) = 13
// fib(8) = 21
// fib(9) = 34`

const files = ['main.js', 'utils.js', 'algoritmlar.js', 'maʼlumot-tuzilmalar.js', 'README.md']

export default function CodeLab() {
  return (
    <div className="space-y-6">
      <div>
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold">
          <span className="cyber-gradient-text">Kod laboratoriyasi</span>
        </motion.h1>
        <p className="text-slate-500 dark:text-white/40 text-sm mt-1">Brauzeringizda kod yozishni mashq qiling</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden">
        {/* Editor Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/60 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-400 dark:bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500/60" />
            </div>
            <span className="text-xs text-slate-500 dark:text-white/30 ml-3 font-mono">main.js</span>
          </div>
          <button className="btn-cyber text-xs py-1.5 px-4 flex items-center gap-1.5">
            <Play size={12} /> Ishga tushirish
          </button>
        </div>

        <div className="flex">
          {/* File Explorer */}
          <div className="w-48 border-r border-slate-200/60 dark:border-white/[0.06] p-3 hidden md:block bg-slate-50/30 dark:bg-transparent">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-white/40 mb-3">
              <FolderOpen size={14} /> <span className="font-medium">Fayllar</span>
            </div>
            {files.map((f, i) => (
              <div key={f} className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs cursor-pointer transition-colors ${i === 0 ? 'bg-indigo-50 dark:bg-white/[0.06] text-indigo-600 dark:text-white/80 font-medium' : 'text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white/50 hover:bg-slate-50 dark:hover:bg-transparent'}`}>
                <FileCode size={12} /> {f}
              </div>
            ))}
          </div>

          {/* Code Area */}
          <div className="flex-1 p-5 min-h-[400px] bg-white dark:bg-transparent">
            <pre className="font-mono text-sm leading-relaxed">
              {sampleCode.split('\n').map((line, i) => (
                <div key={i} className="flex">
                  <span className="text-slate-300 dark:text-white/15 w-8 text-right mr-4 select-none text-xs leading-relaxed">{i + 1}</span>
                  <span className={
                    line.startsWith('//')
                      ? 'text-green-600/60 dark:text-green-400/50'
                      : line.includes('function')
                        ? 'text-purple-600/80 dark:text-purple-400/80'
                        : line.includes('console')
                          ? 'text-indigo-600/70 dark:text-cyan-400/70'
                          : 'text-slate-600 dark:text-white/60'
                  }>{line}</span>
                </div>
              ))}
            </pre>
          </div>
        </div>

        {/* Terminal */}
        <div className="border-t border-slate-200/60 dark:border-white/[0.06] p-4 bg-slate-900 dark:bg-black/30">
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-white/30 mb-2">
            <Terminal size={12} /> Terminal
          </div>
          <div className="font-mono text-xs text-green-400/80 dark:text-green-400/60 space-y-0.5">
            <p>$ node main.js</p>
            <p className="text-slate-400 dark:text-white/40">fib(0) = 0</p>
            <p className="text-slate-400 dark:text-white/40">fib(1) = 1</p>
            <p className="text-slate-400 dark:text-white/40">fib(2) = 1</p>
            <p className="text-slate-400 dark:text-white/40">fib(3) = 2</p>
            <p className="text-green-400/70 dark:text-cyan-400/50">✓ Bajarildi — 12ms</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
