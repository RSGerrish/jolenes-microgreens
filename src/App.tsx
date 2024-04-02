import "@mantine/core/styles.css";
import { MantineProvider, Center } from "@mantine/core";
import { theme } from "./theme";
import { HeaderSimple } from "./components/HeaderSimple";
import { HeroContentLeft } from "./components/HeroContentLeft";
import { HeroAbout } from "./components/HeroAbout";
import { GetInTouch } from "./components/GetInTouch";

export default function App() {
  return (
    <MantineProvider theme={theme}>
        <HeaderSimple />
        <HeroContentLeft />
        <HeroAbout />
        <Center>
          <GetInTouch />
        </Center>
    </MantineProvider>
  );
}
