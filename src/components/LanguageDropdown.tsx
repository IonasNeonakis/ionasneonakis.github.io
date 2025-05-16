import {
  Button,
  Option, DropdownWrapper, Flex, Row,
} from "@/once-ui/components";
import { useState } from "react";
import { routing } from "@/i18n/routing";
import { LanguageImage } from "./LanguageImage";

interface LanguageDropdownProps {
  handleLanguageChange: (string: 'fr' | 'en') => void;
  currentLocale: 'fr' | 'en';
  isLoading: boolean
}


export function LanguageDropdown({handleLanguageChange, currentLocale, isLoading} : LanguageDropdownProps){
  const [isOpen, setIsOpen] = useState(false);

  const options = routing.locales.map((locale) => {
    return {
      label: <LanguageImage locale={locale} size={20} isLoading={isLoading} />,
      value: locale,
    };
  })

  const handleSelect = (value: 'fr' | 'en') => {
    handleLanguageChange(value);
    setIsOpen(false);
  };

  return (
    <DropdownWrapper
      isOpen={isOpen}
      onOpenChange={() => {!isLoading && setIsOpen(!isOpen)}}
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