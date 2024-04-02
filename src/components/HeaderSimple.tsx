import { useState } from 'react';
import { Container, Group, Burger, Image } from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
`import { MantineLogo } from '@mantinex/mantine-logo';`
import joleneLogo from '../assets/WebLogo2.png';
import classes from './HeaderSimple.module.css';

interface ScrollPosition {
  x: number;
  y: number;
}

const aboutPos: Partial<ScrollPosition> = {
  x: 0, 
  y: 850
}

const contactPos: Partial<ScrollPosition> = {
  x: 0,
  y: 2000
}

const wherePos: Partial<ScrollPosition> = {
  x: 0,
  y: 2000
}

const links = [
  { link: '#about', pos: aboutPos, label: 'About' },
  { link: '#contact', pos: contactPos, label: 'Contact' },
  { link: '#where', pos: wherePos, label: 'Where To Buy' },
];

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const [scroll, scrollTo] = useWindowScroll();

  const currentPos: Partial<ScrollPosition> = {
    x: scroll.x,
    y: scroll.y
  }

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        scrollTo(link.pos);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Image 
          src={joleneLogo} 
          h={55}
          w="auto"
          fit="contain"
        />
        <Group gap={10} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
      <div className={classes.ghost}>{currentPos.x}</div>
    </header>
  );
}