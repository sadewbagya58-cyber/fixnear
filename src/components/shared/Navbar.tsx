import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-slate-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
          Aura<span className="text-slate-900">Service</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/listing" className="text-sm font-medium text-slate-600 hover:text-blue-600">Find Developers</Link>
          <Link href="/listing" className="text-sm font-medium text-slate-600 hover:text-blue-600">Find Designers</Link>
          <Link href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600">How it Works</Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm font-semibold text-slate-700 hover:text-blue-600 px-4 py-2">Login</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all">
            Join as Pro
          </button>
        </div>
      </div>
    </nav>
  );
}
