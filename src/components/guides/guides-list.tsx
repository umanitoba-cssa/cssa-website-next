import { MarkdownGroup } from "@/lib/mdx";
import GuideCard from "./guide-card";
import path from "path";

interface GuidesListProps {
  guides: MarkdownGroup[];
  href: string;
}

const GuidesList: React.FC<GuidesListProps> = ({ guides, href }) => {
  if (guides.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium">No guides available</h3>
        <p className="text-muted-foreground">Check back later for new guides!</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {guides.map((guide) => (
        <GuideCard
          key={guide.slug}
          title={guide.title}
          description={guide.description}
          href={path.join(href, guide.slug)}
          author={guide.author}
          date={guide.date}
        />
      ))}
    </div>
  );
};

export default GuidesList; 