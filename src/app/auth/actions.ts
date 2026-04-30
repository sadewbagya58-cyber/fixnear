'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return redirect('/login?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as 'buyer' | 'freelancer'
  const full_name = formData.get('full_name') as string
  const phone = formData.get('phone') as string
  
  // freelancer specific
  const skills = formData.get('skills') as string
  const city = formData.get('city') as string
  const price = formData.get('price') as string
  const bio = formData.get('bio') as string

  const { data: authData, error: authError } = await supabase.auth.signUp({ email, password })

  if (authError) {
    return { error: authError.message }
  }

  if (authData.user) {
    // Insert into profiles
    const profileData: any = {
      id: authData.user.id,
      role: role,
      full_name: full_name,
      phone: phone,
      is_provider: role === 'freelancer',
      available: true
    }

    if (role === 'freelancer') {
      const skillsArray = skills ? skills.split(',').map(s => s.trim()).filter(s => s !== '') : [];
      profileData.skills = skillsArray;
      profileData.city = city;
      profileData.price = parseFloat(price) || 0;
      profileData.bio = bio;
      profileData.category = skillsArray.length > 0 ? skillsArray[0] : 'general';
    }

    const { error: profileError } = await supabase.from('profiles').insert([profileData]);

    if (profileError) {
      return { error: profileError.message || 'Failed to create profile' }
    }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
