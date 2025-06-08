import { Outlet } from "react-router";
import { Link, Badge, Box, Flex, HStack, Heading } from "@chakra-ui/react";
import { InternalLink } from "../components/InternalLink";
import { FaGithub } from "react-icons/fa";

export const AppLayout = () => {
  return (
    <>
      <Box>
        <Flex>
          <HStack>
            <Heading>
              <InternalLink to="/">BVIEW</InternalLink>
            </Heading>
            <HStack>
              <Badge variant="outline">
                <InternalLink to="/view?f=sample/ls">ls</InternalLink>
              </Badge>
              <Badge variant="outline">
                <InternalLink to="/view?f=sample/rfc9593.txt">txt</InternalLink>
              </Badge>
              <Badge variant="outline">
                <InternalLink to="/view?f=sample/go_hello">
                  Go binary
                </InternalLink>
              </Badge>
              <Badge variant="outline">
                <InternalLink to="/view?f=sample/a.out">C binary</InternalLink>
              </Badge>
              <Badge variant="outline">
                <InternalLink to="/view?f=sample/tree.jpg">JPG</InternalLink>
              </Badge>
              <Badge variant="outline">
                <InternalLink to="/view?f=sample/tree_gray.jpg">
                  JPG(gray)
                </InternalLink>
              </Badge>
              <Badge variant="outline">
                <InternalLink to="/view?f=sample/cat.png">PNG</InternalLink>
              </Badge>
              <Link href="https://github.com/kijimaD/bview">
                <FaGithub />
              </Link>
            </HStack>
          </HStack>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
};
