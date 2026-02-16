import { MarkdownGroup } from "@/lib/mdx";
import MarkdownCard from "./markdown-card";
import path from "path";

interface MarkdownListProps {
  markdown: MarkdownGroup[];
  href: string;
}

const MarkdownList: React.FC<MarkdownListProps> = ({ markdown, href }) => {
  if (markdown.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium">No markdown available</h3>
        <p className="text-muted-foreground">Check back later for new docs!</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {markdown.map((markdownPart) => (
        <MarkdownCard
          key={markdownPart.slug}
          title={markdownPart.title}
          description={markdownPart.description}
          href={path.join(href, markdownPart.slug)}
          author={markdownPart.author}
          date={markdownPart.date}
        />
      ))}
    </div>
  );
};

export default MarkdownList; 
