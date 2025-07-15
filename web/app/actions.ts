// /web/app/actions.ts

'use server' // This magic string marks all functions in this file as Server Actions.

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function saveLOProgress(loId: string, chapterId: string) {
  // 1. Create a Supabase client that is safe to use on the server.
  const supabase = createServerActionClient({ cookies })

  // 2. Get the current user's session data.
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to save progress.' }
  }

  // 3. Insert a new row into the 'user_progress' table.
  const { data, error } = await supabase
    .from('user_progress')
    .insert([
      { 
        user_id: user.id, 
        learning_outcome_id: loId,
        // You could add more data here, like what course it belongs to.
      },
    ])
    .select()

  if (error) {
    console.error('Error saving progress:', error)
    return { error: 'Could not save progress.' }
  }
  
  // 4. Important for caching: tell Next.js to refresh the data for the chapter page.
  // This ensures that if the user reloads, their progress is immediately visible.
  revalidatePath(`/course/${chapterId}`)

  return { success: true, data }
}