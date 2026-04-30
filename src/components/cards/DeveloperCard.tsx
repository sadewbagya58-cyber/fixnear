import React from 'react';
import { MapPin, Phone, MessageSquare, ShieldCheck, Clock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeveloperCardProps {
  id: string;
  name: string;
  role: 'developer' | 'designer';
  skills: string[];
  location: string;
  dist_meters?: number;
  verified: boolean;
  available: boolean;
  experience: number;
  phone: string;
  whatsapp: string;
  rating?: number; // Added rating
}

export default function DeveloperCard({
  name,
  role,
  skills,
  location,
  dist_meters,
  verified,
  available,
  experience,
  phone,
  whatsapp,
  rating = 4.8 // Default dummy rating
}: DeveloperCardProps) {
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi, I found you on AuraService. I need a website. Can we discuss?")}`;
  
  const distanceText = dist_meters 
    ? `${(dist_meters / 1000).toFixed(1)} km away` 
    : location;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-xl font-bold text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            {name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-slate-900">{name}</h3>
              {verified && <ShieldCheck className="w-4 h-4 text-blue-500 fill-blue-50" />}
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-slate-500 font-medium capitalize">{role}</p>
              <span className="text-slate-300 text-xs">•</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-slate-700">{rating}</span>
              </div>
            </div>
          </div>
        </div>
        {available && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
            <Clock className="w-3 h-3" />
            Available
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {(skills || []).slice(0, 3).map((skill) => (
          <span key={skill} className="px-2 py-1 rounded-md bg-slate-50 text-slate-600 text-xs font-medium">
            {skill}
          </span>
        ))}
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-sm text-slate-500 gap-2">
          <MapPin className="w-4 h-4" />
          <span>{distanceText || 'Location not specified'}</span>
        </div>
        <div className="flex items-center text-sm text-slate-500 gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>{experience || 0} years experience</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <a 
          href={`tel:${phone}`}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-all active:scale-95 shadow-sm shadow-emerald-200"
        >
          <MessageSquare className="w-4 h-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
