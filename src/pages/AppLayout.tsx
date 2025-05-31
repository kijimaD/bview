import { Outlet } from "react-router";
import { Box, Flex, HStack, Heading } from "@chakra-ui/react";
import { InternalLink } from "../components/InternalLink";

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
              <InternalLink to="/view?f=sample/ls">ls</InternalLink>
              <InternalLink to="/view?f=sample/rfc9593.txt">txt</InternalLink>
              <InternalLink to="/view?f=sample/go_hello">
                go binary
              </InternalLink>
              <InternalLink to="/view?f=sample/tree.jpg">JPG</InternalLink>
              <InternalLink to="/view?f=sample/tree_gray.jpg">
                JPG(gray)
              </InternalLink>
              <InternalLink to="/view?f=sample/cat.png">PNG</InternalLink>
            </HStack>
          </HStack>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
};
