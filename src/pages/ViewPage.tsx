import { CrawlerCanvas } from "../components/CrawlerCanvas";
import { FileCanvas } from "../components/FileCanvas";
import { useAppContext } from "../hooks/app/AppContext";

export function ViewPage() {
  const { state } = useAppContext();

  return (
    <>
      <h1>viewer</h1>
      {state.fileName ? (
        <>
          <p>📄 file name: {state.fileName}</p>
          <p>📦 byte length: {state.bytes?.length}</p>
        </>
      ) : (
        <p>file not loaded</p>
      )}
      <CrawlerCanvas />
      <FileCanvas />
    </>
  );
}
