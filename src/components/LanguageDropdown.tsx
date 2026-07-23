import {
  Button,
  Column,
  DropdownWrapper,
  type DropdownWrapperProps,
  Option,
  Row,
} from "@once-ui-system/core";
import { type Locale, routing } from "@/i18n/routing";
import { LanguageImage } from "./LanguageImage";

interface LanguageDropdownProps extends Pick<DropdownWrapperProps, "placement"> {
  handleLanguageChange: (string: Locale) => void;
  currentLocale: Locale;
  isLoading: boolean;
}

export function LanguageDropdown({
  handleLanguageChange,
  currentLocale,
  isLoading,
  placement,
}: LanguageDropdownProps) {
  const options = routing.locales.map((locale) => {
    return {
      label: <LanguageImage locale={locale} size={20} isLoading={false} />,
      value: locale,
    };
  });

  const handleSelect = (value: Locale) => {
    handleLanguageChange(value);
  };

  return (
    <DropdownWrapper
      placement={placement}
      closeAfterClick
      trigger={
        <Button
          style={{ width: "32px", height: "32px", minHeight: "0" }}
          disabled={isLoading}
          variant="secondary"
        >
          <LanguageImage locale={currentLocale} size={20} isLoading={isLoading} />
        </Button>
      }
      dropdown={
        <Column gap="1" center>
          {options.map((option) => (
            <Option
              key={option.value}
              paddingX="4"
              paddingY="4"
              label={
                <Row style={{ width: "20px", height: "20px" }} center>
                  {option.label}
                </Row>
              }
              value={option.value}
              selected={option.value === currentLocale}
              onClick={handleSelect}
            />
          ))}
        </Column>
      }
    />
  );
}
