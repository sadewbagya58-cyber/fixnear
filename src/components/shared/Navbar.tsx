import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { signOut } from '@/app/auth/actions';
import { User, LogOut, LayoutDashboard } from 'lucide-react';

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
          Aura<span className="text-slate-900">Service</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600">Find Professionals</Link>
          <Link href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600">How it Works</Link>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              
              <div className="h-8 w-[1px] bg-slate-200" />
              
              <form action={signOut}>
                <button 
                  type="submit"
                  className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </form>

              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 text-blue-600">
                <User className="w-5 h-5" />
              </div>
            </div>
          ) : (
            <>
              <Link 
                href="/login" 
                className="text-sm font-semibold text-slate-700 hover:text-blue-600 px-4 py-2"
              >
                Login
              </Link>
              <Link 
                href="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/10"
              >
                Join as Pro
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
