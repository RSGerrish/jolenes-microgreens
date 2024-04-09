import { Text, Title, TextInput, Button, Image, Center, Stack, Group, Modal } from '@mantine/core';
import image from '../assets/motorbike-delivery-man.jpg';
import classes from './JoinMailList.module.css';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

export function JoinMailList() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const weekly = false;
  const [opened, { open, close }] = useDisclosure(false)

  const handleJoinList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const address = {name, email, weekly}

    console.log(JSON.stringify(address))

    const response = await fetch('http://localhost:4000/api/maillist', {
      method: 'POST',
      body: JSON.stringify(address),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      open()
    }

    if (response.ok) {
      setName('')
      setEmail('')
      setError(null)
      open()
      console.log('Added to list')
    }
  }

  return (
    <Center>
      <div className={classes.wrapper}>
        <div className={classes.body}>
          <Title className={classes.title}>Don't miss the launch...</Title>
          <Text fw={500} fz="lg" mb={5}>
            Get notified when delivery goes live!
          </Text>
          <Text fz="sm" c="dimmed">
            Our delivery service and online shop will be going live at the end of April 2024. Sign up to get an email once the service is up
            and running. All orders will be delivered Monday of each week. Orders over $20 qualify for free delivery.
          </Text>
            <form onSubmit={handleJoinList}>
            <Stack className={classes.controls}>
              <TextInput
                placeholder="Your name"
                classNames={{ root: classes.inputWrapper }}
                onChange={event => setName(event.target.value)}
                value={name}
              />
              <Group gap={0} className={classes.emailWrapper}>
                <TextInput
                  placeholder="Your email"
                  classNames={{ input: classes.input2, root: classes.inputWrapper }}
                  onChange={event => setEmail(event.target.value)}
                  value={email}
                />
                <Button type="submit" className={classes.control}>Submit</Button>
              </Group>
            </Stack>
          </form>
        </div>
        <Image src={image} className={classes.image} />
      </div>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
          {!error && <Text size="lg">
            Thank you for your interest! You'll be one of the first to know once the service goes live.
          </Text>}
          {error && <Text size="lg">{error}</Text>}
      </Modal>
    </Center>
  );
}