import "@mantine/core/styles.css";
import { MantineProvider, Grid } from "@mantine/core";
import { theme } from "./theme";
import { HeaderSimple } from "./components/HeaderSimple";
import { HeroContentLeft } from "./components/HeroContentLeft";
import { ContactForm } from "./components/ContactForm";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <HeaderSimple />
      <HeroContentLeft />
      <Grid>
        <Grid.Col span={3} />
        <Grid.Col span={6}>
          <ContactForm />
        </Grid.Col>
        <Grid.Col span={3} />
      </Grid>
    </MantineProvider>
  );
}
