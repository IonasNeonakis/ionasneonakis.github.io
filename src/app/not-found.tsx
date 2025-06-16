import { Button, Column, Heading, Text } from "@once-ui-system/core";

export default function NotFound() {
  return (
    <Column as="section" fill center paddingBottom="160">
      <Text marginBottom="s" variant="display-strong-xl">
        404
      </Text>
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
