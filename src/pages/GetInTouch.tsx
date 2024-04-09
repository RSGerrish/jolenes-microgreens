import { Center, Paper, Text, TextInput, Textarea, Button, Group, SimpleGrid, Modal, Overlay, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import emailjs from '@emailjs/browser';
import { ContactIconsList } from '../components/ContactIcons';
import classes from './GetInTouch.module.css';

export function GetInTouch() {
  const form = useForm({
    initialValues: {
      user_name: '',
      user_email: '',
      subject: '',
      message: '',
    },
    validate: {
      user_name: (value) => value.trim().length < 2,
      user_email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Center>
      <Paper shadow="md" radius="lg" className={classes.paper}>
        <div className={classes.wrapper}>
          <div className={classes.contacts}>
            <Overlay
              gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .45) 30%)"
              opacity={1}
              zIndex={0}
              radius={'var(--mantine-radius-lg)'}
            />
            <Container className={classes.container} size="md">
              <Text fz="lg" fw={700} className={classes.title} c="#fff">
                Contact information
              </Text>

              <ContactIconsList />
            </Container>
          </div>
          <Modal opened={opened} onClose={close} withCloseButton={false} centered>
            {
              <Text size="lg">
                Thank you for reaching out! We'll be in touch shortly.
              </Text>
            }
          </Modal>
          <form className={classes.form} onSubmit={form.onSubmit((values) => {
            emailjs
            .send('contact_service', 'contact_form', values, {
              publicKey: '5u7y04Qa7bcAKzuxm',
            })
            .then(
              () => {
                console.log('SUCCESS');
                form.reset();
                open();
              },
              (error) => {
                console.log('FAILED...', error.text);
              },
            );
          })
          }>
            <Text fz="lg" fw={700} className={classes.title}>
              Get in touch
            </Text>

            <div className={classes.fields}>
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <TextInput 
                  label="Your name" 
                  placeholder="Your name" 
                  name="user_name"
                  {...form.getInputProps('user_name')}
                />
                <TextInput 
                  label="Your email" 
                  placeholder="youremail@domain.com" 
                  name="user_email" 
                  {...form.getInputProps('user_email')}
                  required 
                />
              </SimpleGrid>

              <TextInput 
                mt="md" 
                label="Subject" 
                placeholder="Subject" 
                name="subject" 
                {...form.getInputProps('subject')}
                required 
              />

              <Textarea
                mt="md"
                label="Your message"
                name="message"
                placeholder="Your message here"
                minRows={3}
                {...form.getInputProps('message')}
              />

              <Group justify="flex-end" mt="md">
                <Button type="submit" className={classes.control}>
                  Send message
                </Button>
              </Group>
            </div>
          </form>
        </div>
      </Paper>
    </Center>
  );
}