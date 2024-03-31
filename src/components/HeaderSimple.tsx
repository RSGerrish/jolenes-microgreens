import { useState } from 'react';
import { Container, Group, Burger, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
`import { MantineLogo } from '@mantinex/mantine-logo';`
import joleneLogo from '../assets/WebLogo2.png';
import classes from './HeaderSimple.module.css';

const links = [
  { link: '/about', label: 'About' },
  { link: '/pricing', label: 'Contact' },
  { link: '/learn', label: 'Where To Buy' },
];

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
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
          fit="containt"
        />
        <Group gap={10} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}