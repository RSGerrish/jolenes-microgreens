import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { HeaderSimple } from '../components/HeaderSimple';
import { FooterSimple } from '../components/FooterSimple';


export function RouteLayout() {
  return(
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 0, breakpoint: 'xs' }}
      padding="md"
    >
      <AppShell.Header>
        <HeaderSimple />
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer>
        <FooterSimple />
      </AppShell.Footer>
    </AppShell>
  )
}