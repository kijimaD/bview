import { CrawlerCanvas } from "../components/CrawlerCanvas";
import { FileCanvas } from "../components/FileCanvas";
import { useAppContext } from "../hooks/app/AppContext";
import { Heading, Text } from "@chakra-ui/react";

export function ViewPage() {
  const { state } = useAppContext();

  return (
    <>
      <Heading size="4xl">viewer</Heading>
      {state.fileName ? (
        <>
          <Text>📄 file name: {state.fileName}</Text>
          <Text>📦 byte length: {state.bytes?.length}</Text>
        </>
      ) : (
        <Text>file not loaded</Text>
      )}
      <CrawlerCanvas />
      <FileCanvas />
    </>
  );
}
