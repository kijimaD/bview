import "./App.css";
import { FileLoadPage } from "./pages/FileLoadPage";
import { ViewPage } from "./pages/ViewPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { AppProvider } from "./hooks/app/AppProvider";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/load" element={<FileLoadPage />} />
            <Route path="/view" element={<ViewPage />} />
            <Route path="*" element={<h1>Not Found Page!</h1>} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ChakraProvider>
  );
}

export default App;
