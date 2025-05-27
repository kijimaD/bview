import { CrawlerCanvas } from "../components/CrawlerCanvas";
import { useAppContext } from "../hooks/app/AppContext";

export function ViewPage() {
  const { state } = useAppContext();

  return (
    <>
      <h1>viewer</h1>
      {state.fileName ? (
        <>
          <p>📄 ファイル名: {state.fileName}</p>
          <p>📦 バイト長: {state.bytes?.length}</p>
        </>
      ) : (
        <p>ファイルが読み込まれていません。</p>
      )}
      <CrawlerCanvas />
    </>
  );
}
