"use client";

import { useState } from 'react';
import EditProfileModal from './EditProfileModal';

export default function DashboardProfileActions({ profile }: { profile: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="mt-10 pt-8 border-t border-slate-100">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-slate-200"
        >
          Edit Professional Profile
        </button>
      </div>

      <EditProfileModal 
        profile={profile} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
