import {
  Button,
  Group,
  Paper,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import bg from "./bg.svg";
import classes from "./GetInTouch.module.css";
import { ContactIconsList } from "./contact-icons";

export function GetInTouch() {
  return (
    <Paper shadow="md" radius="lg" my="xl" w="100%">
      <div className={classes.wrapper}>
        <div
          className={classes.contacts}
          style={{ backgroundImage: `url(${bg.src})` }}
        >
          <Text fz="lg" fw={700} className={classes.title} c="#fff">
            Холбоо барихыг хүсвэл
          </Text>

          <ContactIconsList />
        </div>

        <form
          className={classes.form}
          onSubmit={(event) => event.preventDefault()}
        >
          <Text fz="lg" fw={700} className={classes.title}>
            Та илүү дэлгэрэнгүй мэдээлэл авах бол доорх мэдээлэлийг бөглөнө үү
          </Text>

          <div className={classes.fields}>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput label="Нэр" placeholder="Нэр" />
              <TextInput
                label="Цахим хаяг"
                placeholder="hello@mantine.dev"
                required
              />
            </SimpleGrid>

            <TextInput mt="md" label="Утас" placeholder="Утас" required />

            <Textarea
              mt="md"
              label="Нэмэлт мэдээлэл"
              placeholder="Please include all relevant information"
              minRows={3}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" className={classes.control}>
                Илгээх
              </Button>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}
