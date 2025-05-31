import "./App.css";
import { FileLoadPage } from "./pages/FileLoadPage";
import { ViewPage } from "./pages/ViewPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { AppProvider } from "./hooks/app/AppProvider";
import { AppLayout } from "./pages/AppLayout";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <AppProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route path="/view" element={<ViewPage />} />
              <Route path="/" element={<FileLoadPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </AppProvider>
    </ChakraProvider>
  );
}

export default App;
