import { CrawlerCanvas } from "../components/CrawlerCanvas";
import { FileCanvas } from "../components/FileCanvas";
import { HexView } from "../components/HexView";
import { useAppContext } from "../hooks/app/AppContext";
import { Badge, Text, Flex, Box, HStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function ViewPage() {
  const { state, dispatch } = useAppContext();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const filename = decodeURIComponent(searchParams.get("f") || "");

    if (filename) {
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
  }, [searchParams, dispatch]);

  return (
    <>
      <Flex direction="row" height="100%">
        <Box
          flex="1"
          p={2}
          style={{
            width: "100%",
            height: "100%",
            overflow: "scroll",
            position: "relative",
          }}
        >
          <CrawlerCanvas />
          <FileCanvas />
        </Box>
        <Box flex="1" p={2} height="100%">
          {state.fileName ? (
            <HStack>
              <Badge>{state.fileName}</Badge>
              <Badge>{state.bytes?.length} Byte</Badge>
            </HStack>
          ) : (
            <Text>file not loaded</Text>
          )}
          {state.bytes && (
            <HexView
              bytes={state.bytes}
              view={state.view}
              cursor={state.cursor}
              width={16}
              height={20}
            />
          )}
        </Box>
      </Flex>
    </>
  );
}
