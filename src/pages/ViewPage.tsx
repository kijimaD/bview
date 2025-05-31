import { CrawlerCanvas } from "../components/CrawlerCanvas";
import { FileCanvas } from "../components/FileCanvas";
import { useAppContext } from "../hooks/app/AppContext";
import { Text, Flex, Box, HStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ViewPage() {
  const { state, dispatch } = useAppContext();
  const url = useLocation().search;

  useEffect(() => {
    const params = new URLSearchParams(url);
    const filename = decodeURIComponent(params.get("f") || "");

    if (!state.bytes && filename) {
      fetch(filename)
        .then((res) => {
          if (!res.ok) throw new Error("File not found");
          return res.arrayBuffer();
        })
        .then((arrayBuffer) => {
          const bytes = new Uint8Array(arrayBuffer);
          dispatch({
            type: "LOAD_FILE",
            payload: { fileName: filename, bytes },
          });
        })
        .catch((err) => {
          console.error("load error:", err);
        });
    }
  });

  return (
    <>
      <Flex direction="row">
        <Box flex="1" p={2}>
          <CrawlerCanvas />
          <FileCanvas />
        </Box>
        <Box flex="1" p={2}>
          {state.fileName ? (
            <>
              <HStack>
                <Text>📄 {state.fileName}</Text>
                <Text>📦 {state.bytes?.length}</Text>
              </HStack>
            </>
          ) : (
            <Text>file not loaded</Text>
          )}
          テーブル
        </Box>
      </Flex>
    </>
  );
}
