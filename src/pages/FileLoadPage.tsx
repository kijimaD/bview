import { useFileLoader } from "../hooks/fileloader";
import { FileUpload, Input } from "@chakra-ui/react";

export function FileLoadPage() {
  return (
    <>
      <LoadFile />
    </>
  );
}

const LoadFile = () => {
  const { handleFileLoad } = useFileLoader();

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
