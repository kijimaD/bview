import { useNavigate } from "react-router-dom";
import type { ChangeEvent } from "react";
import { useAppContext } from "./app/AppContext";

export const useFileLoader = () => {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();

  const handleFileLoad = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const bytes = new Uint8Array(arrayBuffer);

      dispatch({
        type: "LOAD_FILE",
        payload: { fileName: file.name, bytes },
      });
      navigate("/view");
    };
  };

  return { handleFileLoad };
};
