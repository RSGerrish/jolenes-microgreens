import { Container, Text } from '@mantine/core';
import classes from './HeroAbout.module.css';

export function HeroAbout() {
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          Welcome to Jolene's Microgreens
        </h1>

        <Text className={classes.description} color="dimmed">
          Where passion for farming meets a commitment to providing 
          {' '}
          <Text fw={700} component="span" variant="gradient" gradient={{ from: 'lime', to: 'teal' }} inherit>
            fresh, nutritious microgreens
          </Text>{' '}
          to our community. 
          Founded by Robin Gerrish and his best friend Jolene, our farm is dedicated to sustainable agriculture practices and delivering 
          {' '}
          <Text fw={700} component="span" variant="gradient" gradient={{ from: 'lime', to: 'teal' }} inherit>
            premium quality 
          </Text>{' '}
           microgreens to your table.
        </Text>
        <Text className={classes.description} color="dimmed">
          We believe in the power of community and are dedicated to fostering 
          {' '}
          <Text fw={700} component="span" variant="gradient" gradient={{ from: 'pear', to: 'teal' }} inherit>
            meaningful connections 
          </Text>{' '}
          with our customers. 
          Whether you're a local restaurant looking to
          {' '}
          <Text fw={700} component="span" variant="gradient" gradient={{ from: 'pear', to: 'teal' }} inherit>
            source fresh ingredients
          </Text>{' '}
          or an individual seeking to incorporate more greens into your diet,
          {' '}
          <Text fw={700} component="span" variant="gradient" gradient={{ from: 'pear', to: 'teal' }} inherit>
            we are here to support you
          </Text>{' '}
          on your journey to healthier living.
        </Text>
        <Text className={classes.description} color="dimmed">
          Ready to experience the difference that fresh microgreens can make in your life? 
          We'd love to hear from you! 
          Contact us today to learn more about what we have to offer, place an order, or inquire about wholesale opportunities. 
        </Text>
      </Container>
    </div>
  );
}
