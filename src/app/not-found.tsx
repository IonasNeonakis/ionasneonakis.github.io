import FuzzyText from "@/components/FuzzyText/FuzzyText";
import { Button, Column, Heading, Text } from "@once-ui-system/core";

export default function NotFound() {
  return (
    <Column as="section" fill center paddingBottom="160">
      <FuzzyText baseIntensity={0.2} hoverIntensity={0.6} enableHover>
        404
      </FuzzyText>
      <Heading marginBottom="l" variant="display-default-xs">
        Page Not Found
      </Heading>
      <Text marginBottom="s" onBackground="neutral-weak">
        The page you are looking for does not exist.
      </Text>
      <Button href="/" size="l">
        Back to Home
      </Button>
    </Column>
  );
}
