import { AppShell } from '@mantine/core';
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { HeaderSimple } from '../components/HeaderSimple';
import { FooterSimple } from '../components/FooterSimple';
import { useItemsContext } from '../hooks/useItemsContext';

export function RouteLayout() {
  const {items, dispatch} = useItemsContext()

  useEffect(() => {
    const initItems = async () => {
      const response = await fetch('http://localhost:4000/api/items')
      const json = await response.json()

      if (response.ok) {
        console.log('dispatching SET_ITEMS')
        dispatch({type: 'SET_ITEMS', payload: json})
        console.log('AppShell items', items)
      }
    }

    initItems()
  }, [])

  return (
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