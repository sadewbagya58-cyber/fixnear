import { supabase } from './supabase';

export interface ProviderFilters {
  query?: string;
  role?: 'developer' | 'designer' | 'all';
  lat?: number | null;
  lng?: number | null;
}

export async function getProviders(filters: ProviderFilters) {
  const { query, role, lat, lng } = filters;

  // Base query: fetch providers
  let supabaseQuery = supabase
    .from('profiles')
    .select('*')
    .eq('is_provider', true);

  // Category/Role filter
  if (role && role !== 'all') {
    supabaseQuery = supabaseQuery.eq('category', role);
  }

  // Search filter (full_name, city, or category)
  if (query && query.trim() !== '') {
    const pattern = `%${query.trim()}%`;
    supabaseQuery = supabaseQuery.or(`full_name.ilike.${pattern},city.ilike.${pattern},category.ilike.${pattern}`);
  }

  if (lat && lng) {
    // RPC function 'get_providers_near' for distance sorting
    const { data, error } = await supabase.rpc('get_providers_near', {
      user_lat: lat,
      user_lng: lng,
      category_filter: role === 'all' ? null : role,
      search_query: query || null
    });
    
    if (error) throw error;
    return data;
  }

  const { data, error } = await supabaseQuery;
  if (error) throw error;
  return data;
}
