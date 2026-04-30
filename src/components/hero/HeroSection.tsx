"use client";

import React, { useState } from 'react';
import { Search, MapPin, Navigation, Code, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onNearMeClick: () => void;
  onFilterChange: (role: 'developer' | 'designer' | 'all') => void;
  isLocationLoading: boolean;
}

export default function HeroSection({
  searchQuery,
  onSearchChange,
  onNearMeClick,
  onFilterChange,
  isLocationLoading
}: HeroSectionProps) {
  return (
    <section className="relative bg-white pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6 animate-fade-in">
            <MapPin className="w-4 h-4 mr-2" />
            Hyper-local Talent in Sri Lanka
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6">
            Find the best <span className="text-blue-600">Web Developers</span> near you.
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Directly connect with trusted UI Designers and Developers in your city. 
            No middlemen, no bidding—just local expertise.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative group mb-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 p-2">
            <div className="pl-4 flex-1 flex items-center">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search by city or skill..."
                className="w-full py-3 outline-none text-slate-700 placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            <button 
              onClick={onNearMeClick}
              disabled={isLocationLoading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50"
            >
              <Navigation className={cn("w-4 h-4", isLocationLoading && "animate-spin")} />
              <span className="hidden sm:inline">{isLocationLoading ? 'Locating...' : 'Near Me'}</span>
            </button>
          </div>
        </div>

        {/* Category Quick Filters */}
        <div className="flex flex-wrap justify-center gap-4 animate-slide-up">
          <button 
            onClick={() => onFilterChange('developer')}
            className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-all shadow-sm font-medium"
          >
            <Code className="w-5 h-5 text-blue-600" />
            Web Development
          </button>
          <button 
            onClick={() => onFilterChange('designer')}
            className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-all shadow-sm font-medium"
          >
            <Palette className="w-5 h-5 text-blue-600" />
            UI Design
          </button>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
