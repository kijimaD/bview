import "./App.css";
import { FileLoadPage } from "./pages/FileLoadPage";
import { ViewPage } from "./pages/ViewPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <Routes>
          <Route path="/load" element={<FileLoadPage />} />
          <Route path="/view" element={<ViewPage />} />
          <Route path="*" element={<h1>Not Found Page!</h1>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
