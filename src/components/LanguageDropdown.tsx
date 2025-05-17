import {
  Button,
  Option, DropdownWrapper, Flex, Row,
} from "@/once-ui/components";
import {Locale, routing} from "@/i18n/routing";
import { LanguageImage } from "./LanguageImage";

interface LanguageDropdownProps {
  handleLanguageChange: (string: Locale) => void;
  currentLocale: Locale;
  isLoading: boolean
}

export function LanguageDropdown({handleLanguageChange, currentLocale, isLoading} : LanguageDropdownProps){
  const options = routing.locales.map((locale) => {
    return {
      label: <LanguageImage locale={locale} size={20} isLoading={isLoading} />,
      value: locale,
    };
  })

  const handleSelect = (value: Locale) => {
    handleLanguageChange(value);
  };

  return (
    <DropdownWrapper
      trigger={
        <Button
          size="xs"
          disabled={isLoading}
          variant="secondary"
        >
          <LanguageImage locale={currentLocale} size={20} isLoading={isLoading} />
        </Button>
      }
      dropdown={
          <Flex direction="column" gap="1" >
          {options.map((option) => (
            <Option
              paddingY="4"
              paddingX="4"
              key={option.value}
              label={<Row> {option.label}</Row>}
              value={option.value}
              selected={option.value === currentLocale}
              onClick={handleSelect}
            />
          ))}
          </Flex>
      }
    />
  );
}