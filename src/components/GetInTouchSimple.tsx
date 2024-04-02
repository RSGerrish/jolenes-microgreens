import { TextInput, Textarea, SimpleGrid, Group, Title, Text, Button, Modal, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import emailjs from '@emailjs/browser';
import classes from './GetInTouchSimple.module.css';

export function GetInTouchSimple() {
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

  /*
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('contact_service', 'contact_form', form.getInputProps, {
        publicKey: 'YOUR_PUBLIC_KEY',
      })
      .then(
        () => {
          console.log('SUCCESS');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  */

  return (
    <div className={classes.git}>
      <Container size="sm">
        <Modal opened={opened} onClose={close} withCloseButton={false} centered>
          {
            <Text size="lg">
              Thank you for reaching out! We'll be in touch shortly.
            </Text>
          }
        </Modal>
        <form onSubmit={form.onSubmit((values) => {
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
          <Title className={classes.title}>
            Get in touch
          </Title>

          <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
            <TextInput
              classNames={{ label: classes.label }}
              label="Name"
              placeholder="Your name"
              name="user_name"
              variant="filled"
              {...form.getInputProps('user_name')}
            />
            <TextInput
              classNames={{ label: classes.label }}
              label="Email"
              placeholder="Your email"
              name="user_email"
              variant="filled"
              {...form.getInputProps('user_email')}
            />
          </SimpleGrid>

          <TextInput
            classNames={{ label: classes.label }}
            label="Subject"
            placeholder="Subject"
            mt="md"
            name="subject"
            variant="filled"
            {...form.getInputProps('subject')}
          />
          <Textarea
            classNames={{ label: classes.label }}
            mt="md"
            label="Message"
            placeholder="Your message"
            maxRows={10}
            minRows={5}
            autosize
            name="message"
            variant="filled"
            {...form.getInputProps('message')}
          />

          <Group justify="center" mt="xl">
            <Button type="submit" size="md">
              Send message
            </Button>
          </Group>
        </form>
      </ Container>
    </div>
  );
}