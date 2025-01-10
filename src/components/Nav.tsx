import { Box, Flex, HStack, Heading } from "@chakra-ui/react";

import { Container } from "@chakra-ui/react";

export default function Nav() {
  return (
    <>
      <Box px={4} bg="teal.muted">
        <Container>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <HStack spacing={8} alignItems={"center"}>
              <Heading>Binder Finder</Heading>
              {/* <ColorModeButton /> */}
            </HStack>
            <Flex alignItems={"center"}></Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
