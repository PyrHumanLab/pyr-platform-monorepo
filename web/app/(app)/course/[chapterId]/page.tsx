// /web/app/(app)/course/[chapterId]/page.tsx

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { client as sanityClient } from '@/lib/sanity-client'; // Imports the Sanity client
import ChapterView from '@/components/course/ChapterView';
import { SanityChapter, UserProgress } from '@/types'; // Imports the data "shapes" we defined

// This tells Next.js to always fetch the latest data for the user
export const dynamic = 'force-dynamic';

export default async function ChapterPage({ params }: { params: { chapterId: string } }) {
  // --- Part 1: Authentication ---
  // Check if the user is logged in. If not, send them to the login page.
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  // --- Part 2: Fetching Content from Sanity ---
  // This is a special query language (GROQ) to get exactly the data we need.
  // It says: "Find the chapter with this ID, then find all the Learning Outcomes
  // that belong to it, and for each of those, find all their Learning Cycles."
  const chapterQuery = `*[_type == "chapter" && _id == $chapterId][0]{
    _id,
    title,
    notes,
    aiAssessment,
    "learningOutcomes": *[_type == "learningOutcome" && chapter._ref == ^._id] | order(loIndex asc) {
      _id,
      title,
      loIndex,
      "learningCycles": *[_type == "learningCycle" && learningOutcome._ref == ^._id] | order(cycleIndex asc) {
        _id,
        type,
        cycleIndex,
        readContent,
        audioUrl,
        videoId
      }
    }
  }`;

  // We run the query and give it the chapterId from the URL
  const chapterData: SanityChapter = await sanityClient.fetch(chapterQuery, { chapterId: params.chapterId });

  // If the chapter doesn't exist, we show a simple message.
  if (!chapterData) {
    return <div>Chapter not found.</div>;
  }
  
  // --- Part 3: Fetching Progress from Supabase ---
  // Now we ask Supabase: "In the 'user_progress' table, find all rows for this
  // user that match one of the Learning Outcomes from the chapter we just fetched."
  const { data: userProgressData } = await supabase
    .from('user_progress')
    .select('learning_outcome_id, completed_at')
    .eq('user_id', session.user.id)
    .in('learning_outcome_id', chapterData.learningOutcomes.map(lo => lo._id));
  
  // We clean up the data to just be a simple list of IDs that are completed.
  const completedLOs: string[] = userProgressData?.map((p: UserProgress) => p.learning_outcome_id) || [];

  // --- Part 4: Handing Everything Off ---
  // Finally, we pass all the data we've collected (the chapter content and the
  // user's progress) to our ChapterView component, which will handle the display.
  return <ChapterView chapterData={chapterData} initialCompletedLOs={completedLOs} />;
}