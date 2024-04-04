import { Container, Group, Burger, Image, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import joleneLogo from '../assets/WebLogo2.png';
import classes from './HeaderSimple.module.css';
import { NavLink } from 'react-router-dom';

const links = [
  { link: '/about', label: 'About' },
  { link: '/get-in-touch', label: 'Contact' },
  { link: '/where-to-buy', label: 'Where To Buy' },
];

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={classes.link}
      onClick={toggle}
    >
      {link.label}
    </NavLink>
  ));

  const menuItems = links.map((link) => (
    <Menu.Item
      component={NavLink}
      key={link.label}
      to={link.link}
      className={classes.link}
      onClick={toggle}
    >
      {link.label}
    </Menu.Item>
  ))

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <NavLink to="/">
          <Image 
            src={joleneLogo} 
            h={55}
            w="auto"
            fit="contain"
          />
        </NavLink>
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
    </header>
  );
}