// app/(app)/layout.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

export default async function AppLayout({ children }: { children: ReactNode }) {
  // Create a Supabase client for server-side operations
  const supabase = createServerComponentClient({ cookies });

  // Get the current session
  const { data: { session } } = await supabase.auth.getSession();

  // If there is no session, redirect the user to the login page
  if (!session) {
    redirect('/login');
  }

  // If there is a session, render the children (the protected page)
  return (
    <div className="flex min-h-screen flex-col">
      {/* We can add a persistent Header or Sidebar for logged-in users here later */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}