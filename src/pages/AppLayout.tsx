import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";

export const AppLayout = () => {
  return (
    <Box>
      this is layout...
      <Outlet />
    </Box>
  );
};
