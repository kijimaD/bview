import "./App.css";
import { CrawlerCanvas } from "./components/CrawlerCanvas";
import { FileLoadPage } from "./pages/FileLoadPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <FileLoadPage /> <CrawlerCanvas />
              </>
            }
          />
          <Route path="*" element={<h1>Not Found Page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
