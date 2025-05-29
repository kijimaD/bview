import { useFileLoader } from "../hooks/fileloader";
import { Heading, FileUpload, Input } from "@chakra-ui/react";

export function FileLoadPage() {
  return (
    <>
      <Heading size="4xl">file load</Heading>
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
