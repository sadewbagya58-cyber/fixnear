"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, Briefcase, UserRound } from 'lucide-react';
import { signup } from '@/app/auth/actions';
import { useRouter } from 'next/navigation';

type Role = 'buyer' | 'freelancer' | null;

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!role) return;

    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append('role', role);

    try {
      const result = await signup(formData);
      
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        // Redirect to homepage on success
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 sm:p-8">
      <Link href="/" className="absolute top-6 left-6 flex items-center text-slate-400 hover:text-white transition-colors group z-10">
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span className="hidden sm:inline">Back to home</span>
      </Link>

      <div className="w-full max-w-xl relative z-0">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Create Account</h1>
          <p className="text-slate-400 text-sm sm:text-base">Join the best hyper-local talent network in Sri Lanka.</p>
        </div>

        {!role ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-semibold text-white text-center mb-6">How do you want to use the platform?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setRole('buyer')}
                className="flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500 hover:bg-slate-800/50 transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UserRound className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">I am a Buyer</h3>
                <p className="text-slate-400 text-sm text-center">I want to hire professionals for my projects.</p>
              </button>

              <button
                onClick={() => setRole('freelancer')}
                className="flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500 hover:bg-slate-800/50 transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">I am a Freelancer</h3>
                <p className="text-slate-400 text-sm text-center">I want to offer my services and get hired.</p>
              </button>
            </div>
            
            <p className="mt-8 text-center text-slate-500 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-500 font-semibold hover:underline">Log in</Link>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 bg-slate-900/30 p-6 sm:p-8 rounded-2xl border border-slate-800/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                Sign up as a {role === 'buyer' ? 'Buyer' : 'Freelancer'}
              </h2>
              <button 
                type="button" 
                onClick={() => setRole(null)}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Change Role
              </button>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="full_name" className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                  placeholder="e.g. Kasun Perera"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-slate-300 ml-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-medium text-slate-300 ml-1">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-sm font-medium text-slate-300 ml-1">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                  placeholder="e.g. 0771234567"
                />
              </div>

              {role === 'freelancer' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="skills" className="text-sm font-medium text-slate-300 ml-1">Skills / Category</label>
                      <input
                        id="skills"
                        name="skills"
                        type="text"
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                        placeholder="e.g. Next.js, Figma, React"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label htmlFor="city" className="text-sm font-medium text-slate-300 ml-1">City (Location)</label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                        placeholder="e.g. Colombo 03"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="price" className="text-sm font-medium text-slate-300 ml-1">Price (LKR) per Hour/Project</label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      required
                      min="0"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                      placeholder="e.g. 5000"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="bio" className="text-sm font-medium text-slate-300 ml-1">Short Bio / Description</label>
                    <textarea
                      id="bio"
                      name="bio"
                      required
                      rows={3}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500 resize-none"
                      placeholder="Tell clients about your expertise..."
                    />
                  </div>
                </>
              )}
            </div>

            <div className="pt-4">
              <p className="text-xs text-slate-500 mb-5 leading-relaxed text-center sm:text-left">
                By signing up, you agree to our <Link href="#" className="text-blue-500 hover:underline">Terms of Service</Link> and <Link href="#" className="text-blue-500 hover:underline">Privacy Policy</Link>.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
            
            <p className="mt-6 text-center text-slate-500 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-500 font-semibold hover:underline">Log in</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
