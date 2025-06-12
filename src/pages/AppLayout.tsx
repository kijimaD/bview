import { Outlet } from "react-router";
import { Link, Badge, Box, Flex, HStack, Heading } from "@chakra-ui/react";
import { InternalLink } from "../components/InternalLink";
import { FaGithub } from "react-icons/fa";

interface ExampleLink {
  path: string;
  name: string;
}

const links: ExampleLink[] = [
  {
    path: "buseum/202501010001_1/cat.png",
    name: "PNG",
  },
  {
    path: "buseum/202501010002_2/tree.jpg",
    name: "JPG",
  },
  {
    path: "buseum/202501010002_2/tree_gray.jpg",
    name: "JPG(gray)",
  },
  {
    path: "buseum/202501010003_3/nature.tiff",
    name: "TIFF",
  },
  {
    path: "buseum/202501040004_4/buseum",
    name: "Go binary",
  },
  {
    path: "buseum/202501050005_5/bocchan.txt",
    name: "japanese txt",
  },
  {
    path: "buseum/202501060006_6/rfc9593.txt",
    name: "english txt",
  },
  {
    path: "buseum/202501070007_7/ls",
    name: "ls binary",
  },
  {
    path: "buseum/202501080008_8/test.zip",
    name: "ZIP",
  },
  {
    path: "buseum/202501090009_9/a.out",
    name: "C binary",
  },
  {
    path: "buseum/202506091900_10/Hello.class",
    name: "Java Class File",
  },
  {
    path: "buseum/202506102221_15/buseum",
    name: "WASM",
  },
  {
    path: "buseum/202506092000_11/hello-world-image.tar",
    name: "Docker Image",
  },
  {
    path: "buseum/202506102049_12/test.git/objects/pack/pack-e5b48f78e5af87d0559e7a43dfe0e0ace42ca5e6.pack",
    name: "Git Object(pack)",
  },
  {
    path: "buseum/202506122357_22/example.sqlite3",
    name: "SQLite3",
  },
  {
    path: "buseum/202506102152_13/example.mp3",
    name: "MP3",
  },
  {
    path: "buseum/202506102153_14/example.wav",
    name: "WAV",
  },
  {
    path: "buseum/202506122116_16/example.avi",
    name: "AVI",
  },
  {
    path: "buseum/202506122117_17/example.mov",
    name: "MOV",
  },
  {
    path: "buseum/202506122118_18/example.mp4",
    name: "MP4",
  },
  {
    path: "buseum/202506122119_19/example.ogg",
    name: "OGG",
  },
  {
    path: "buseum/202506122120_20/example.webm",
    name: "WebM",
  },
  {
    path: "buseum/202506122121_21/example.wmv",
    name: "WMV",
  },
];

export const AppLayout = () => {
  return (
    <>
      <Box>
        <Flex>
          <HStack>
            <Heading>
              <InternalLink to="/">BVIEW</InternalLink>
            </Heading>
            <HStack>
              {links.map((item, index) => (
                <Badge variant="outline" key={index}>
                  <InternalLink to={`/view?f=${item.path}`}>
                    {item.name}
                  </InternalLink>
                </Badge>
              ))}
              <Link href="https://github.com/kijimaD/bview">
                <FaGithub />
              </Link>
            </HStack>
          </HStack>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
};
