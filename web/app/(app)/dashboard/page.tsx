// /web/app/(app)/dashboard/page.tsx

import Link from 'next/link';
import { client as sanityClient } from '@/lib/sanity-client';
import { BookMarked } from 'lucide-react';

// This is a type for the data we're fetching on this page
interface ChapterListing {
  _id: string;
  title: string;
  chapterIndex: number;
}

// Make the component async so we can use 'await'
export default async function DashboardPage() {
  // 1. Write a query to get all chapters, ordered by their index
  const query = `*[_type == "chapter"] | order(chapterIndex asc) {
    _id,
    title,
    chapterIndex
  }`;

  // 2. Fetch the chapter list from Sanity
  const chapters: ChapterListing[] = await sanityClient.fetch(query);

  return (
    <div className="w-full min-h-screen bg-deep-blue flex flex-col items-center p-8 text-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-flame bg-clip-text text-transparent">
          Course Dashboard
        </h1>
        <p className="mt-4 text-lg text-text-secondary">Your learning journey begins here. Select a chapter to begin.</p>
      </header>

      <main className="w-full max-w-2xl">
        <div className="bg-lab-blue rounded-xl border border-gray-700/80 shadow-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Available Chapters</h2>
          
          {chapters && chapters.length > 0 ? (
            <ul className="space-y-4">
              {/* 3. Map over the fetched chapters and create a link for each one */}
              {chapters.map((chapter) => (
                <li key={chapter._id}>
                  <Link 
                    href={`/course/${chapter._id}`} 
                    className="flex items-center gap-4 p-4 rounded-lg bg-deep-blue hover:bg-flame/10 border border-transparent hover:border-flame/50 transition-all duration-200 group"
                  >
                    <BookMarked className="w-5 h-5 text-flame flex-shrink-0" />
                    <span className="font-semibold text-text-primary group-hover:text-amber">
                      Chapter {chapter.chapterIndex}: {chapter.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-text-muted text-center py-8">No chapters have been published yet.</p>
          )}
        </div>
      </main>
    </div>
  );
}