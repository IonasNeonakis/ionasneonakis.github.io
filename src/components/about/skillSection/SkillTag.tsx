import { Tag } from "@once-ui-system/core";
import React from "react";
import type { Skill } from "./Skills";

interface SkillTag {
  skill: Skill;
}

export function SkillTag({ skill }: SkillTag) {
  const { name, important, icon } = skill;
  return (
    <>
      <Tag variant={important ? "important" : "neutral"} size="s" prefixIcon={icon}>
        {name}
      </Tag>
    </>
  );
}
