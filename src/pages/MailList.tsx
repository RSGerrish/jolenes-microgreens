import { Table, Group, Text, ActionIcon, Anchor, rem } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export function MailList() {
  interface Address {
    name: String,
    email: String,
    weekly: Boolean,
    _id: undefined,
  }

  interface Addresses extends Array<Address>{}

  const [mailList, setMailList] = useState<Addresses>()

  useEffect(() => {
    const fetchMailList = async () => {
      const response = await fetch('http://localhost:4000/api/maillist')
      const json = await response.json()

      if (response.ok) {
        setMailList(json)
      }
    }

    fetchMailList()
  }, [])
  
  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Customer</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{mailList && mailList.map((address: Address) => (
          <Table.Tr key={address._id}>
            <Table.Td>
              <Group gap="sm">
                <Text fz="sm" fw={500}>
                  {address.name}
                </Text>
              </Group>
            </Table.Td>

            <Table.Td>
              <Anchor component="button" size="sm">
                {address.email}
              </Anchor>
            </Table.Td>
            <Table.Td>
              <Group gap={0} justify="flex-end">
                <ActionIcon variant="subtle" color="gray">
                  <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </ActionIcon>
                <ActionIcon variant="subtle" color="red">
                  <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </ActionIcon>
              </Group>
            </Table.Td>
          </Table.Tr>))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}