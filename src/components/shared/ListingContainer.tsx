"use client";

import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/hero/HeroSection';
import DeveloperCard from '@/components/cards/DeveloperCard';
import { useGeolocation } from '@/hooks/useGeolocation';
import { getProviders } from '@/lib/data';
import { DeveloperCardSkeleton } from '@/components/ui/Skeleton';

export default function ListingContainer() {
  const { location, loading: isLocationLoading, getPosition } = useGeolocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'developer' | 'designer' | 'all'>('all');
  const [providers, setProviders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await getProviders({
          query: searchQuery,
          role: roleFilter,
          lat: location.latitude,
          lng: location.longitude
        });
        setProviders(data || []);
      } catch (err: any) {
        console.error("Fetch error:", {
          message: err.message,
          details: err.details,
          hint: err.hint,
          code: err.code
        });
      } finally {
        setIsLoading(false);
      }
    }

    const timer = setTimeout(fetchData, 500); // Debounce search
    return () => clearTimeout(timer);
  }, [searchQuery, roleFilter, location]);

  return (
    <>
      <HeroSection 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterChange={setRoleFilter}
        onNearMeClick={getPosition}
        isLocationLoading={isLocationLoading}
      />

      <section className="py-16 bg-slate-50 min-h-[400px]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {location.latitude ? 'Recommended Near You' : 'Local Professionals'}
              </h2>
              <p className="text-slate-600">
                {roleFilter === 'all' ? 'All Professionals' : `${roleFilter}s`} in Sri Lanka
              </p>
            </div>
            <div className="text-sm text-slate-500 font-medium">
              {providers.length} results found
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <DeveloperCardSkeleton key={i} />
              ))}
            </div>
          ) : providers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((p) => (
                <DeveloperCard 
                  key={p.id}
                  id={p.id}
                  name={p.full_name}
                  category={p.category}
                  userRole={p.role}
                  skills={p.skills}
                  location={p.city}
                  dist_meters={p.dist_meters}
                  verified={p.verified}
                  available={p.available}
                  experience={p.experience_years}
                  phone={p.phone}
                  whatsapp={p.whatsapp}
                  price={p.price}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-500">No results found for "{searchQuery}"</p>
              <button 
                onClick={() => {setSearchQuery(''); setRoleFilter('all');}}
                className="mt-4 text-blue-600 font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
