import { useState } from 'react';
import { Container, Group, Burger, Image } from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
`import { MantineLogo } from '@mantinex/mantine-logo';`
import joleneLogo from '../assets/WebLogo2.png';
import classes from './HeaderSimple.module.css';

const links = [
  { link: {x: 0, y: 850}, label: 'About' },
  { link: {x:0, y: 2000}, label: 'Contact' },
  { link: '/learn', label: 'Where To Buy' },
];

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const [scroll, scrollTo] = useWindowScroll();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        scrollTo(link.link);
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
    </header>
  );
}