import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  onLoad: (filename: string, data: Uint8Array) => void;
}

export const useFileLoader = ({ onLoad }: Props) => {
  const navigate = useNavigate();

  const handleFileLoad = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const file = evt.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;
        if (result instanceof ArrayBuffer) {
          const bytes = new Uint8Array(result, 0, result.byteLength);
          onLoad(file.name, bytes);
          navigate("/view");
        } else {
          console.error("Unexpected reader.result type");
        }
      };

      reader.readAsArrayBuffer(file);
    },
    [onLoad, navigate],
  );

  return { handleFileLoad };
};
