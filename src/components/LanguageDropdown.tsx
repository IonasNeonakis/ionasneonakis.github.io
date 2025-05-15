import {
  Button,
  Column,
  Option, DropdownWrapper,
} from "@/once-ui/components";
import {useState} from "react";
import {routing} from "@/i18n/routing";

interface LanguageDropdownProps {
  handleLanguageChange: (string: 'fr' | 'en') => void;
  currentLocale: string;
}


export function LanguageDropdown({handleLanguageChange, currentLocale} : LanguageDropdownProps){
  const [isOpen, setIsOpen] = useState(false);


  const options = routing.locales.map((locale) => {
    return {
      label: locale.toUpperCase(),
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
      onOpenChange={setIsOpen}
      trigger={
        <Button
          variant="secondary"
          suffixIcon="chevronUp"
          onClick={() => setIsOpen(!isOpen)}
        >
          {options.find(opt => opt.value === currentLocale)?.label}
        </Button>
      }
      dropdown={
        <Column width={4}  padding="4" gap="2" center={true}>
          {options.map((option) => (
            <Option
              key={option.value}
              label={option.label}
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