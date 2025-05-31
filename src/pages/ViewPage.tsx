import { CrawlerCanvas } from "../components/CrawlerCanvas";
import { FileCanvas } from "../components/FileCanvas";
import { useAppContext } from "../hooks/app/AppContext";
import { Text } from "@chakra-ui/react";
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
