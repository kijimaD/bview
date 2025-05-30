import "./App.css";
import { FileLoadPage } from "./pages/FileLoadPage";
import { ViewPage } from "./pages/ViewPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { AppProvider } from "./hooks/app/AppProvider";
import { AppLayout } from "./pages/AppLayout";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route path="/load" element={<FileLoadPage />} />
              <Route path="/view" element={<ViewPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ChakraProvider>
  );
}

export default App;
