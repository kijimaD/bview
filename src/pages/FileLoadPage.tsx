import { useFileLoader } from "../hooks/fileloader";
import { FileUpload, Input } from "@chakra-ui/react";

export function FileLoadPage() {
  return (
    <>
      <h1>file load</h1>
      <LoadFile />
    </>
  );
}

const LoadFile = () => {
  const { handleFileLoad } = useFileLoader({
    onLoad: () => {
      console.log("loading...");
    },
  });

  return (
    <FileUpload.Root gap="1" maxWidth="300px">
      <FileUpload.HiddenInput onChange={handleFileLoad} />
      <FileUpload.Label></FileUpload.Label>
      <Input asChild>
        <FileUpload.Trigger>
          <FileUpload.FileText />
        </FileUpload.Trigger>
      </Input>
    </FileUpload.Root>
  );
};
