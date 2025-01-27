import { Container, HStack, Icon, Link, Stack } from "@chakra-ui/react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

export default function Footer() {
  return (
    <Container as="footer" py={{ base: "10", md: "12" }}>
      <Stack gap="6">
        <Stack direction="row" justify="space-between" align="center">
          <HStack gap="4">
            {socialLinks.map(({ href, icon }, index) => (
              <Link key={index} href={href} colorPalette="gray">
                <Icon size="md">{icon}</Icon>
              </Link>
            ))}
          </HStack>
        </Stack>
      </Stack>
    </Container>
  );
}

const socialLinks = [
  { href: "https://x.com", icon: <SiX /> },
  { href: "https://github.com", icon: <SiGithub /> },
  { href: "https://www.linkedin.com", icon: <SiLinkedin /> },
];
