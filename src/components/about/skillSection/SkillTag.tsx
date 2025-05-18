import { Tag } from "@/once-ui/components";
import React from "react";

interface SkillTag {
  skill: Skill;
}

export function SkillTag({ skill }: SkillTag) {
  const { name, important, icon } = skill;
  return (
    <Tag variant={important ? "success" : "neutral"} size="s" prefixIcon={icon}>
      {name}
    </Tag>
  );
}
