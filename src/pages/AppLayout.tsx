import { Outlet } from "react-router";
import { Box, Flex, HStack, Heading, Link } from "@chakra-ui/react";

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
            <Heading>
              <Link href="/">BVIEW</Link>
            </Heading>
            <HStack>
              <NavLink href={"view?f=sample/ls"}>ls</NavLink>
              <NavLink href={"view?f=sample/rfc9593.txt"}>txt</NavLink>
              <NavLink href={"view?f=sample/go_hello"}>go binary</NavLink>
              <NavLink href={"view?f=sample/tree.jpg"}>JPG</NavLink>
              <NavLink href={"view?f=sample/tree_gray.jpg"}>JPG(gray)</NavLink>
              <NavLink href={"view?f=sample/cat.png"}>PNG</NavLink>
            </HStack>
          </HStack>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
};
