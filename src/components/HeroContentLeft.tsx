import { Overlay, Container, Title, Button, Text } from '@mantine/core';
import classes from './HeroContentLeft.module.css';
import { useNavigate } from 'react-router-dom';

export function HeroContentLeft() {
  const navigate = useNavigate();

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
          navigate("/get-in-touch");
        }}>
          Contact Us
        </Button>
      </Container>
    </div>
  );
}