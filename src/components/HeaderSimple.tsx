import { useState } from 'react';
import { Container, Group, Burger, Image, Menu } from '@mantine/core';
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
  y: 1750
}

const wherePos: Partial<ScrollPosition> = {
  x: 0,
  y: 2250
}

const maboutPos: Partial<ScrollPosition> = {
  x: 0, 
  y: 700
}

const mcontactPos: Partial<ScrollPosition> = {
  x: 0,
  y: 1650
}

const mwherePos: Partial<ScrollPosition> = {
  x: 0,
  y: 2000
}

const links = [
  { link: '#about', pos: aboutPos, label: 'About' },
  { link: '#contact', pos: contactPos, label: 'Contact' },
  { link: '#where', pos: wherePos, label: 'Where To Buy' },
];

const mlinks = [
  { link: '#about', pos: maboutPos, label: 'About' },
  { link: '#contact', pos: mcontactPos, label: 'Contact' },
  { link: '#where', pos: mwherePos, label: 'Where To Buy' },
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

  const menuItems = mlinks.map((link) => (
    <Menu.Item
      component="a"
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => {
        event.preventDefault();
        toggle();
        setActive(link.link);
        scrollTo(link.pos);
      }}
    >
      {link.label}
    </Menu.Item>
  ))

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
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Navigate</Menu.Label>
            {menuItems}
          </Menu.Dropdown>
        </Menu>
      </Container>
      <div className={classes.ghost}>{currentPos.x}</div>
    </header>
  );
}