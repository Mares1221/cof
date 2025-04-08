import { Avatar, Box, Image, Paper, Text } from "@mantine/core";

export default function Card({
  children,
  src,
}: {
  children: any;
  src: string;
}) {
  return (
    <div style={{ padding: "23px" }}>
      <Paper withBorder w={300}>
        <Image src={"/no-image.png"} />
        <Avatar size={"100px"} src={src} mt={-50} mx={"auto"} />
        <Box p={"lg"}>
          <Text ta={"center"} fw={500}>
            {children}
          </Text>
        </Box>
      </Paper>
    </div>
  );
}
