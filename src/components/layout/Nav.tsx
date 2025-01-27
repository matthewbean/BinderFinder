import { Box, Flex, HStack, Heading } from "@chakra-ui/react";

import { Container } from "@chakra-ui/react";

export default function Nav() {
  return (
    <>
      <Box bg="teal.muted">
        <Container>
          <Flex h={12} alignItems={"center"} justifyContent={"space-between"}>
            <HStack spacing={8} alignItems={"center"}>
              <Heading>
                <img
                  style={{
                    display: "inline-block",
                    position: "relative",
                    marginLeft: "0px",
                    top: "-3px",
                  }}
                  src={`/icons/binder${
                    window.matchMedia &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches
                      ? ""
                      : "_black"
                  }.png`}
                  height="18px"
                  width="18px"
                />
                Binder Finder
              </Heading>
            </HStack>
            <Flex alignItems={"center"}></Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
