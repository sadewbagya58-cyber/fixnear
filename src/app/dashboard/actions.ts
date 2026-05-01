'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()

  // Verify the user is authenticated securely on the server
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to update your profile.' }
  }

  const full_name = formData.get('full_name') as string
  const skills = formData.get('skills') as string
  const city = formData.get('city') as string
  const price = formData.get('price') as string
  const bio = formData.get('bio') as string
  
  // Extract the first skill as category if skills exist
  const skillsArray = skills ? skills.split(',').map(s => s.trim()).filter(s => s !== '') : [];
  const category = skillsArray.length > 0 ? skillsArray[0] : 'general';

  const updateData = {
    full_name,
    skills: skillsArray,
    category,
    city,
    price: parseFloat(price) || 0,
    bio,
  }

  // Update profile for the strictly logged-in user
  const { error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', user.id)

  if (error) {
    return { error: error.message || 'Failed to update profile.' }
  }

  // Revalidate to ensure the changes show up immediately on Home page and Dashboard
  revalidatePath('/', 'layout')
  
  return { success: true }
}
