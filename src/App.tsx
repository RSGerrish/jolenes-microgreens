import "@mantine/core/styles.css";
import { MantineProvider, Grid } from "@mantine/core";
import { theme } from "./theme";
import { HeaderSimple } from "./components/HeaderSimple";
import { HeroContentLeft } from "./components/HeroContentLeft";
import { ContactCard } from "./components/ContactCard";
import { HeroAbout } from "./components/HeroAbout";
import { GetInTouchSimple } from "./components/GetInTouchSimple";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <HeaderSimple />
      <HeroContentLeft />
      <HeroAbout />
      <GetInTouchSimple />
      <Grid>
        <Grid.Col span={3} />
        <Grid.Col span={6}>
          <ContactCard />
        </Grid.Col>
        <Grid.Col span={3} />
      </Grid>
    </MantineProvider>
  );
}
