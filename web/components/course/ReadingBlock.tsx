// /web/components/course/ReadingBlock.tsx

interface ReadingBlockProps {
  content?: any; // We'll keep this as 'any' for now.
}

export default function ReadingBlock({ content }: ReadingBlockProps) {
  // If for some reason there is no content, we display a helpful message.
  if (!content) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-lab-blue rounded-lg">
        <p>No reading content available for this section.</p>
      </div>
    );
  }
  
  // We wrap the content in a container with special 'prose' classes.
  // These classes will automatically style our text to look beautiful.
  return (
    <div className="max-w-3xl mx-auto p-8 bg-lab-blue rounded-lg shadow-lg">
      <article className="prose prose-invert prose-lg text-text-secondary">
        {/* For now, we are just displaying the simple text content. */}
        <p>{content}</p>
      </article>
    </div>
  );
}