import { Outlet } from "react-router";
import { Container, Box, Flex, HStack, Heading, Link } from "@chakra-ui/react";

type Props = {
  href?: string;
  children?: React.ReactNode;
};

const NavLink = (props: Props) => {
  const { children, href } = props;

  return (
    <Link px={2} href={href}>
      {children}
    </Link>
  );
};

export const AppLayout = () => {
  return (
    <>
      <Box>
        <Flex>
          <HStack>
            <Heading>BVIEW</Heading>
            <HStack>
              <NavLink href={"load"}>Load</NavLink>
              <NavLink href={"view?f=sample/ls"}>ls</NavLink>
            </HStack>
          </HStack>
        </Flex>
      </Box>
      <Container py="1em">
        <Outlet />
      </Container>
    </>
  );
};
