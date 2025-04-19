import { Container, List, Text, ThemeIcon, Image, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import classes from "./heroBullet.module.css";
import image from "./image.svg";

export function HeroBullets() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            <span className={classes.highlight}>Давуу</span> талууд
          </Title>
          <Text c="dimmed" mt="md">
            Build fully functional accessible web applications faster than ever
            – Mantine includes more than 120 customizable components and hooks
            to cover you in any situation
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck size={12} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Түргэн шуурхай</b> – Түргэн шуурхай таны таны зарын самбарыг
              байршуулж өгнө
            </List.Item>
            <List.Item>
              <b>Олон газар байршуулах</b> – Бидэнд самбар байршуулах олон цэг
              байгаа бөгөөд оршин суугч олонтой хотхон байруудад байршдаг
            </List.Item>
            <List.Item>
              <b>Бодит үр дүн</b> – Хүний хараад шууд унших бодит байршил болон
              загварын хувьд маш шийдэмгий байх болно
            </List.Item>
          </List>
        </div>
        <Image src={image.src} className={classes.image} />
      </div>
    </Container>
  );
}
