import { Flex, Title, Stack } from '@mantine/core';
import { WTBCard } from "../components/WTBCard";
import classes from "./WTBSection.module.css"
import imgFM from '../assets/farmers-market.jpg';
import imgFT from '../assets/farm-table.jpg';
import imgWS from '../assets/food-truck.svg';


interface CardProps {
  image: string;
  title: string;
  description: string;
}

export function WTBSection() {
  const spots: CardProps[] = [
    {
    image: imgFM,
    title: 'Charlotte Regional Farmers Market',
    description: "Season of '24 Every Saturday from 8AM - 2PM"
    },
    {
      image: imgFT,
      title: 'Order Online',
      description: "Coming Soon! Weekly Delivery Service. Free Delivery For Orders Over $20"
    },
    {
      image: imgWS,
      title: 'Wholesale',
      description: "Ready to start incorporating microgreens into your menu? Contact us for wholesale pricing!"
    },
  ];

  return (
    <Stack align="center" className={classes.container}>
      <Title className={classes.title}>
        Where To Buy
      </Title>
      <Flex
        mih={50}
        bg="rgba(0, 0, 0, 0)"
        gap="md"
        justify="center"
        align="flex-end"
        direction="row"
        wrap="wrap"
      >
        <WTBCard image={spots[0].image} title={spots[0].title} description={spots[0].description} />
        <WTBCard image={spots[1].image} title={spots[1].title} description={spots[1].description} />
        <WTBCard image={spots[2].image} title={spots[2].title} description={spots[2].description} />
      </Flex>
    </Stack>
  )
}