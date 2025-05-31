import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router";

type Props = {
  to?: string;
  children?: React.ReactNode;
};

export const InternalLink = (props: Props) => {
  return <ChakraLink as={ReactRouterLink} {...props} />;
};
