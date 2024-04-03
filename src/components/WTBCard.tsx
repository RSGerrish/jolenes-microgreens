import { Card, Image, Text, Group } from '@mantine/core';
import classes from './WTBCard.module.css';

interface CardProps {
  image: string;
  title: string;
  description: string;
}

export function WTBCard({image, title, description}: CardProps) {
  console.log(image);

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {title}
          </Text>
        </Group>
        <Text fz="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>
      {/*
      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Show details
        </Button>
      </Group>
      */}
    </Card>
  );
}