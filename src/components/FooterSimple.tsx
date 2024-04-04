import { Container, Group, Anchor, Image, rem } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import logoNoOutline from '../assets/Logo No Outline.png';
import classes from './FooterSimple.module.css';

const links = [
  { link: '/about', label: 'About' },
  { link: '/get-in-touch', label: 'Contact' },
  { link: '/where-to-buy', label: 'Where to Buy' },
];

export function FooterSimple() {
  const items = links.map((link) => (
    <NavLink
      key={link.label}
      className={classes.link}
      to={link.link}
    >
      {link.label}
    </NavLink>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Image src={logoNoOutline} h={rem(64)} w="auto" fit="contain" className={classes.logo} />
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}