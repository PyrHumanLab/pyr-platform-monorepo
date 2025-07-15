// /web/app/actions.ts

'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function saveLOProgress(loId: string, chapterId: string) {
  const supabase = createServerActionClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to save progress.' }
  }

  const { data, error } = await supabase
    .from('user_progress')
    .insert([{ user_id: user.id, learning_outcome_id: loId }])
    .select()

  if (error) {
    console.error('Error saving progress:', error)
    return { error: 'Could not save progress.' }
  }
  
  revalidatePath(`/course/${chapterId}`)
  return { success: true, data }
}

// --- THIS IS THE FUNCTION THE BUILD IS MISSING ---
export async function getAITutorResponse(question: string, conversationHistory: any[]) {
  const supabase = createServerActionClient({ cookies });
  
  const { data, error } = await supabase.functions.invoke('get-ai-feedback', {
    body: { question, conversationHistory },
  });

  if (error) {
    console.error('Error invoking Supabase function:', error.message);
    return { error: 'There was an issue contacting the AI tutor.' };
  }

  return data;
}