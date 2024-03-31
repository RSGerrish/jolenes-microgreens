import { Overlay, Container, Title, Button, Text } from '@mantine/core';
import classes from './HeroContentLeft.module.css';

export function HeroContentLeft() {
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
          Jolene's Microgreens is an indoor farm allowing for the ultimate in environment control
          allowing for crisp, delicious greens all year 'round.'
        </Text>

        <Button variant="gradient" size="xl" radius="xl" className={classes.control}>
          Contact Us
        </Button>
      </Container>
    </div>
  );
}