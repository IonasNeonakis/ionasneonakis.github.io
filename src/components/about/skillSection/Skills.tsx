import { SkillSection } from "@/components/about/skillSection/SkillSection";
import { Column } from "@/once-ui/components";
import React from "react";

export interface Skill {
  name: string;
  important?: boolean;
  icon?: string;
}

const backendSkills: Skill[] = [
  { name: "Java", important: true },
  { name: "Kotlin", important: true },
  { name: "Spring Boot", important: true },
  { name: "Spring", important: true },
  { name: "Hibernate", important: true },
  { name: "PostgreSQL" },
  { name: "MySQL" },
  { name: "Sql Server" },
  { name: "Flyway" },
  { name: "JUnit 5" },
  { name: "Mockito" },
  { name: "Mockk" },
  { name: "Strikt" },
  { name: "Testcontainers" },
];

const frontendSkills: Skill[] = [
  { name: "React", important: true },
  { name: "TanstackQuery" },
  { name: "TypeScript", important: true },
  { name: "JavaScript" },
  { name: "vite" },
  { name: "NPM" },
  { name: "Jest" },
  { name: "zod" },
  { name: "Tailwind" },
  { name: "Ant Design" },
  { name: "Sass" },
  { name: "CSS" },
  { name: "HTML" },
];

const devopsSkills: Skill[] = [
  { name: "Argo CD" },
  { name: "Kubernetes" },
  { name: "Helm" },
  { name: "Docker" },
  { name: "Keycloak" },
  { name: "DataDog" },
  { name: "Gitlab CI/CD" },
  { name: "Maven" },
  { name: "Gradle" },
  { name: "Git" },
];

const otherSkills: Skill[] = [
  { name: "DDD", important: true },
  { name: "TDD", important: true },
  { name: "Scrum" },
  { name: "Kanban" },
  { name: "Jira" },
];

export function Skills() {
  return (
    <Column horizontal="center" vertical="center">
      <SkillSection title="Backend" skills={backendSkills} />
      <SkillSection title="Frontend" skills={frontendSkills} />
      <SkillSection title="Devops" skills={devopsSkills} />
      <SkillSection title="Others" skills={otherSkills} />
    </Column>
  );
}
