import { IconHeart } from '@tabler/icons-react';
import { Card, Badge, Box, Image, Text, Group, Button, ActionIcon, Skeleton, Pill } from '@mantine/core';
import classes from './ItemCard.module.css';

type QPItem = {
  size: string;
  price: string | number;
}

type QPList = QPItem[];

interface ItemCardProps {
  image: File | null;
  name: string | undefined;
  description: string | undefined;
  sizeOptions: QPList;
  bennies: string[];
  imageUrl: string;
}

export function ItemCard(item: ItemCardProps) {
  const benefitsList = item.bennies.map((benny, index) => (
    <Pill key={index} size="sm" classNames={{root: classes.root}}>{benny}</Pill>
  ))

  const qpList = item.sizeOptions.map((opt, index) => (
    <Badge key={index} size="xl" leftSection={opt.size} rightSection={"$" + (Math.round(Number(opt.price) * 100) / 100).toFixed(2)}></Badge>
  ))

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        {!item.image && !item.imageUrl && <Skeleton height={180} />}
        {item.image && <Image src={URL.createObjectURL(item.image)} alt={item.name} height={180} />}
        {item.imageUrl && !item.image && <Image src={item.imageUrl} alt={item.name} height={180} />}
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          {!item.name && <Skeleton height={30} mb={10}/>}
          {item.name && <Text fz="lg" fw={500} mb={12}>
            {item.name}
          </Text>}
        </Group>
        {!item.description && 
        <Skeleton height={100} />}
        {item.description && 
        <Box w={286} h={90}>
          <Text fz="sm" mt="xs" lineClamp={4} pb={0}>
            {item.description}
          </Text>
        </Box>}
      </Card.Section>
      
      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          SIZE OPTIONS
        </Text>
        {!item.sizeOptions || item.sizeOptions.length <= 0 && <Skeleton height={32} />}
        {item.sizeOptions && 
        <Group gap={7} mt={5}>
          {qpList}
        </Group>}
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          BENEFITS
        </Text>
        {!item.bennies || item.bennies.length <= 0 && <Skeleton height={20} mt={2} />}
        {item.bennies && <Group gap={7} mt={5}>
          <Pill.Group>
            {benefitsList}
          </Pill.Group>
        </Group>}
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Show details
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}