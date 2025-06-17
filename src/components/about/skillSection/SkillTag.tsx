import { Tag } from "@once-ui-system/core";
import React from "react";
import type { Skill } from "./Skills";

import styles from "./SkillTag.module.scss"
import classNames from "classnames";

interface SkillTag {
  skill: Skill;
}

export function SkillTag({ skill }: SkillTag) {
  const { name, important, icon } = skill;
  return (
    <>
      <Tag className={classNames(important && styles.important)}
           variant={important ? undefined : "neutral"} size="s" prefixIcon={icon}>
        {name}
      </Tag>
    </>
  );
}
