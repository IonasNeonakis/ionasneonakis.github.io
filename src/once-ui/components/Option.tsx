import type { SpacingToken } from "@/once-ui/types";
import classNames from "classnames";
import type React from "react";
import { forwardRef } from "react";
import { Flex, Text } from ".";
import { ElementType } from "./ElementType";
import styles from "./Option.module.scss";

export interface OptionProps {
  label: React.ReactNode;
  href?: string;
  value: string;
  hasPrefix?: React.ReactNode;
  hasSuffix?: React.ReactNode;
  description?: React.ReactNode;
  paddingX?: SpacingToken;
  paddingY?: SpacingToken;
  danger?: boolean;
  selected?: boolean;
  highlighted?: boolean;
  tabIndex?: number;
  onClick?: (value: string) => void;
}

const Option = forwardRef<HTMLDivElement, OptionProps>(
  (
    {
      label,
      value,
      href,
      hasPrefix,
      hasSuffix,
      description,
      paddingX,
      paddingY,
      danger,
      selected,
      highlighted,
      tabIndex,
      onClick,
      ...props
    },
    ref,
  ) => {
    if (href && onClick) {
      console.warn("Option should not have both `href` and `onClick` props.");
    }

    return (
      <ElementType
        tabIndex={tabIndex}
        ref={ref}
        href={href}
        className="reset-button-styles"
        style={{ width: "100%" }}
      >
        <Flex
          {...props}
          fillWidth
          vertical="center"
          paddingX={paddingX ?? "12"}
          paddingY={paddingY ?? "8"}
          gap="12"
          radius="m"
          role="option"
          aria-selected={selected}
          tabIndex={-1}
          borderWidth={1}
          borderStyle="solid"
          cursor="interactive"
          transition="micro-medium"
          onClick={() => onClick?.(value)}
          className={classNames(styles.option, {
            [styles.danger]: danger,
            [styles.selected]: selected,
            [styles.highlighted]: highlighted,
          })}
          data-value={value}
        >
          {hasPrefix && <Flex className={styles.prefix}>{hasPrefix}</Flex>}
          <Flex
            horizontal="start"
            style={{
              whiteSpace: "nowrap",
            }}
            fillWidth
            direction="column"
          >
            <Text onBackground="neutral-strong" variant="label-default-s">
              {label}
            </Text>
            {description && (
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {description}
              </Text>
            )}
          </Flex>
          {hasSuffix && <Flex className={styles.suffix}>{hasSuffix}</Flex>}
        </Flex>
      </ElementType>
    );
  },
);

Option.displayName = "Option";
export { Option };
