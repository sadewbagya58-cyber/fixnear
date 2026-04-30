"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function OnboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    whatsapp: '',
    location_name: '',
    skills: '',
    experience_years: '',
    role: 'developer' as 'developer' | 'designer',
    bio: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');
      
      const { error } = await supabase.from('profiles').insert([
        {
          full_name: formData.full_name,
          phone: formData.phone,
          whatsapp: formData.whatsapp || formData.phone,
          city: formData.location_name,
          skills: skillsArray,
          experience_years: parseInt(formData.experience_years) || 0,
          category: formData.role,
          bio: formData.bio,
          is_provider: true,
          available: true
        }
      ]);

      if (error) throw error;
      setSuccess(true);
      setTimeout(() => router.push('/'), 3000);
    } catch (err) {
      console.error(err);
      alert('Error saving profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-md animate-fade-in">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">You're Onboard!</h1>
          <p className="text-slate-600 mb-8">
            Your profile is now live. Clients in your area can now find and contact you directly.
          </p>
          <Link href="/" className="text-blue-600 font-semibold hover:underline">
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-blue-600 p-8 text-white">
            <h1 className="text-2xl font-bold mb-2">Join as a Professional</h1>
            <p className="text-blue-100 opacity-90">Create your provider profile and start getting leads in Sri Lanka.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Kasun Perera"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Role</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value as any})}
                >
                  <option value="developer">Web Developer</option>
                  <option value="designer">UI Designer</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  placeholder="e.g. 0771234567"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">City</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Colombo 03"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  value={formData.location_name}
                  onChange={(e) => setFormData({...formData, location_name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Skills (comma separated)</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Next.js, Figma, React, Tailwind"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Years of Experience</label>
              <input 
                required
                type="number" 
                placeholder="e.g. 5"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                value={formData.experience_years}
                onChange={(e) => setFormData({...formData, experience_years: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Short Bio</label>
              <textarea 
                rows={3}
                placeholder="Tell clients about your expertise..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Register Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
