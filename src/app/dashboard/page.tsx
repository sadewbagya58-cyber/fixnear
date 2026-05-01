import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { ShieldCheck, MapPin, Star, Settings, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import DashboardProfileActions from '@/components/dashboard/DashboardProfileActions';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch the user's profile
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching profile:', error);
  }

  if (!profile) {
    redirect('/onboard');
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Your Dashboard</h1>
            <p className="text-slate-600">Manage your professional presence and leads.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Settings className="w-4 h-4" />
            Account Settings
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-0 opacity-50" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex gap-6">
                    <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-blue-200">
                      {profile.full_name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl font-bold text-slate-900">{profile.full_name}</h2>
                        {profile.verified && <ShieldCheck className="w-5 h-5 text-blue-500 fill-blue-50" />}
                      </div>
                      <p className="text-slate-500 font-medium capitalize">{profile.category} • {profile.experience_years} Years Exp.</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-slate-700">4.8 Rating</span>
                      </div>
                    </div>
                  </div>
                  <Link 
                    href={`/profile/${profile.id}`}
                    className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
                  >
                    View Public Profile
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">About</h3>
                    <p className="text-slate-700 leading-relaxed">{profile.bio || "No bio added yet."}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill: string) => (
                        <span key={skill} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <DashboardProfileActions profile={profile} />
              </div>
            </div>
          </div>

          {/* Sidebar Stats/Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Availability</h3>
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <span className="text-sm font-semibold text-emerald-700">Accepting New Leads</span>
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Profile Views</span>
                  <span className="font-bold text-slate-900">128</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">WhatsApp Leads</span>
                  <span className="font-bold text-slate-900">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Phone Calls</span>
                  <span className="font-bold text-slate-900">5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
