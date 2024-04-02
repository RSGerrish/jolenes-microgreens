import { Overlay, Container, Title, Button, Text } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import classes from './HeroContentLeft.module.css';

interface ScrollPosition {
  x: number;
  y: number;
}

const contactPos: Partial<ScrollPosition> = {
  x: 0,
  y: 1750
}

export function HeroContentLeft() {
  const [scroll, scrollTo] = useWindowScroll();

  const currentPos: Partial<ScrollPosition> = {
    x: scroll.x,
    y: scroll.y
  }

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, .45) 30%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>Charlotte Local Microgreens</Title>
        <Text className={classes.description} size="xl" mt="xl">
        Nestled in the heart of Steele Creek, NC our farm is dedicated to bringing the freshest microgreens straight to your table. Join us on a journey to healthier living as we cultivate a greener, brighter future—one delicious harvest at a time.
        </Text>

        <Button variant="gradient" size="xl" radius="xl" className={classes.control} onClick={(event) => {
          event.preventDefault();
          scrollTo(contactPos);
        }}>
          Contact Us
        </Button>
      </Container>
      <div className={classes.ghost}>{currentPos.x}</div>
    </div>
  );
}