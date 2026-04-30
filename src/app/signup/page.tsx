import { signup } from '@/app/auth/actions'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SignupPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-8 left-8 flex items-center text-slate-400 hover:text-white transition-colors group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to home
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400">Join the best hyper-local talent network in Sri Lanka.</p>
        </div>

        <form className="space-y-4">
          {searchParams.error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
              {decodeURIComponent(searchParams.error)}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="name@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-2">
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              By signing up, you agree to our <Link href="#" className="text-blue-500 hover:underline">Terms of Service</Link> and <Link href="#" className="text-blue-500 hover:underline">Privacy Policy</Link>.
            </p>
            <button
              formAction={signup}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-blue-900/20"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}
