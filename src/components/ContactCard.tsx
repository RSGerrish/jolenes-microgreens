import { Card, Overlay, Title, Grid, Center } from '@mantine/core';
import classes from './ContactCard.module.css';

export function ContactCard() {
  return (
    <Center>
    <Card shadow="sm" radius="md" className={classes.card} withBorder>
      <Overlay className={classes.overlay} opacity={0.55} zIndex={0} />

      <div className={classes.content}>
        <Title fw={700} className={classes.title}>
          Contact Us
        </Title>

        <Grid className={classes.text} justify="space-between">
          <Grid.Col span={6}>
            Phone:
          </Grid.Col>
          <Grid.Col span={6}>
            (704)-294-7905
          </Grid.Col>
          <Grid.Col span={6}>
            Email:
          </Grid.Col>
          <Grid.Col span={6}>
            info@jolenesmicrogreens.com
          </Grid.Col>
        </Grid>
      </div>
    </Card>
    </Center>
  );
}