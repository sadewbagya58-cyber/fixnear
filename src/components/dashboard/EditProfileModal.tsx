"use client";

import { useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { updateProfile } from '@/app/dashboard/actions';

interface EditProfileModalProps {
  profile: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ profile, isOpen, onClose }: EditProfileModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await updateProfile(formData);
      
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Edit Professional Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="full_name" className="text-sm font-semibold text-slate-700">Full Name</label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              required
              defaultValue={profile.full_name}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="skills" className="text-sm font-semibold text-slate-700">Skills / Category (comma separated)</label>
              <input
                id="skills"
                name="skills"
                type="text"
                required
                defaultValue={(profile.skills || []).join(', ')}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                placeholder="e.g. Plumber, Electrician"
              />
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="city" className="text-sm font-semibold text-slate-700">City (Location)</label>
              <input
                id="city"
                name="city"
                type="text"
                required
                defaultValue={profile.city}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="price" className="text-sm font-semibold text-slate-700">Price (LKR) per Hour/Project</label>
            <input
              id="price"
              name="price"
              type="number"
              required
              min="0"
              defaultValue={profile.price || ''}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="bio" className="text-sm font-semibold text-slate-700">Short Bio / Description</label>
            <textarea
              id="bio"
              name="bio"
              required
              rows={4}
              defaultValue={profile.bio || ''}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all resize-none"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 min-w-[140px] shadow-md shadow-blue-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
