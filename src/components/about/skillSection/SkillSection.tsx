import { Accordion, Flex } from "@once-ui-system/core";
import { SkillTag } from "@/components/about/skillSection/SkillTag";
import type { Skill } from "./Skills";

export interface SkillSectionProps {
  title: string;
  skills: Skill[];
}

export function SkillSection({ title, skills }: SkillSectionProps) {
  return (
    <Accordion size="s" radius="full" title={title}>
      <Flex wrap gap="4">
        {skills.map((skill) => (
          <SkillTag key={skill.name} skill={skill} />
        ))}
      </Flex>
    </Accordion>
  );
}
