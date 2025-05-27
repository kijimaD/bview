import { useNavigate } from "react-router-dom";
import type { ChangeEvent } from "react";

export const useFileLoader = () => {
  const navigate = useNavigate();

  const handleFileLoad = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const bytes = new Uint8Array(arrayBuffer);

      console.log(bytes);
      // viewstore.actions.load.trigger(true, file.name, bytes);

      // 画面遷移
      navigate("/view");
    };
  };

  return { handleFileLoad };
};
