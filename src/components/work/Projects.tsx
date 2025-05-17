import { addBasePath } from "@/app/utils/imageUtils";
import { getPosts } from "@/app/utils/utils";
import { ProjectCard } from "@/components";
import { Column } from "@/once-ui/components";

interface ProjectsProps {
  range?: [number, number?];
  locale: string;
}

export function Projects({ range, locale }: ProjectsProps) {
  const allProjects = getPosts(["src", "app", "[locale]", "work", "projects", locale]);

  const sortedProjects = allProjects.toSorted((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: addBasePath(member.avatar) })) || []}
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}
