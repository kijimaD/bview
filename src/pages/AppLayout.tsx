import { Outlet } from "react-router";
import { Box, Flex, HStack, Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  href?: string;
  children?: React.ReactNode;
};

const NavLink = (props: Props) => {
  const { children, to } = props;

  return (
    <Link px={2} as={RouterLink} to={to}>
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
            <Heading>
              <Link to="/">BVIEW</Link>
            </Heading>
            <HStack>
              <NavLink to={"/view?f=sample/ls"}>ls</NavLink>
              <NavLink to={"/view?f=sample/rfc9593.txt"}>txt</NavLink>
              <NavLink to={"/view?f=sample/go_hello"}>go binary</NavLink>
              <NavLink to={"/view?f=sample/tree.jpg"}>JPG</NavLink>
              <NavLink to={"/view?f=sample/tree_gray.jpg"}>JPG(gray)</NavLink>
              <NavLink to={"/view?f=sample/cat.png"}>PNG</NavLink>
            </HStack>
          </HStack>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
};
