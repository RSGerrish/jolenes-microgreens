import { ActionIcon, Badge, Box, Button, Center, Container, Grid, Group, InputBase, Modal, NumberInput, SegmentedControl, ScrollArea, SimpleGrid, Skeleton, Stack, Text, TextInput, Textarea, FileInput, Pill, rem, useMantineTheme, Combobox, useCombobox, Input } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import { useState, useEffect, FormEvent, ReactNode } from 'react';
import { ItemCard } from '../components/ItemCard';
import classes from './AddItem.module.css';
import { useDisclosure } from '@mantine/hooks';

const PRIMARY_COL_HEIGHT = rem(500);

type QPItem = {
  size: string;
  price: string | number;
}

type QPList = QPItem[]

type productList = {
  _id: string,
  name: string,
  description: string,
  itemImage: File,
  benefits: string,
  qps: QPList,
}[]

interface NumberInput {
  onChange: ((value: number) => void);
}

export function AddItem() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
  const TERTIARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 6 - var(--mantine-spacing-md) / 2)`;
  const [loading, setLoading] = useState(true);
  const [itemImage, setItemImage] = useState<File | null>(null);
  const [itemImageUrl, setItemImageUrl] = useState<string>('');
  const [productName, setProductName] = useState<string | undefined>(undefined);
  const [productDesc, setProductDesc] = useState<string | undefined>(undefined);
  const [newBenefit, setNewBenefit] = useState<string>('');
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newPrice, setNewPrice] = useState<string | number>(5.00);
  const [sizeSel, setSizeSel] = useState<string>('2 oz');
  const [QPs, setQPs] = useState<QPList>([])
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const [products, setProducts] = useState<productList>([])
  const [selId, setSelId] = useState<string>('')

  const cbOptions: ReactNode[] = products.map((item) => {
    return (
    <Combobox.Option value={item._id} key={item._id}>
      {item.name}
    </Combobox.Option>
    )
  })

  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false)

  const itemCombobox = useCombobox({
    onDropdownClose: () => itemCombobox.resetSelectedOption(),
  })

  const sizes: { label: string, value: string }[] = [
    { "label": "2 oz", "value": "2 oz" },
    { "label": "5 oz", "value": "5 oz" },
    { "label": "10 oz", "value": "10 oz"}
  ]

  const toggleLoad = () => {
    setLoading(false);
  }

  const benefitsList = benefits.map((benny, index) => (
    <Pill key={index} size="sm" miw={75} withRemoveButton classNames={{root: classes.root}} onRemove={() => handleRemoveBenefit(benny)}>{benny}</Pill>
  ))

  const handleAddBenefit = () => {
    setBenefits([...benefits, newBenefit]);
    setNewBenefit('');
  }

  const handleRemoveBenefit = (ben: string) => {
    setBenefits((current) => current.filter((v) => v !== ben));
  }

  const qpList = QPs.map((qp, index) => {
    return(
      <Pill key={index} withRemoveButton onRemove={() => handleRemoveQPItem(qp)}>
        {qp.size + " $" + (Math.round(Number(qp.price) * 100) / 100).toFixed(2)}
      </Pill>
    )
  })

  const handleAddQPItem = () => {
    const newItem: QPItem = {
      price: newPrice,
      size: sizeSel
    }

    setQPs([...QPs, newItem]);
  }

  const handleRemoveQPItem = (qp: QPItem) => {
    setQPs((current) => current.filter((v) => v !== qp));
  }

  const handleSaveItem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData();
      itemImage && formData.append("image", itemImage)
      productName && formData.append("name", productName)
      productDesc && formData.append("description", productDesc)
      benefits && formData.append("benefits", JSON.stringify(benefits))
      QPs && formData.append("qp", JSON.stringify(QPs))

    const response = await fetch('http://localhost:4000/api/items', {
      method: 'POST',
      body: formData
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      open()
    }

    if (response.ok) {
      handleGetItems()
      setItemImage(null)
      setProductName('')
      setProductDesc('')
      setBenefits([])
      setQPs([])
      setMsg('Item Added')
      open()
    }
  }

  const handleDeleteItem = async () => {
    const response = await fetch('http://localhost:4000/api/items/' + selId, {
      method: 'DELETE'
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      open()
    }

    if (response.ok) {
      handleGetItems()
      setProductName("")
      setItemImage(null)
      setItemImageUrl('')
      setProductName('')
      setProductDesc('')
      setBenefits([])
      setQPs([])
      setMsg('Item Deleted')
      open()
    }
  }

  const handleUpdateItem = async () => {
    const formData = new FormData();
      itemImage && formData.append("image", itemImage)
      productName && formData.append("name", productName)
      productDesc && formData.append("description", productDesc)
      benefits && formData.append("benefits", JSON.stringify(benefits))
      QPs && formData.append("qp", JSON.stringify(QPs))

    console.log('formData', formData)

    const response = await fetch('http://localhost:4000/api/items/' + selId, {
      method: 'PATCH',
      body: formData
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      open()
    }

    if (response.ok) {
      handleGetItems()
      console.log(JSON.stringify(response))
      setMsg('Updated')
      open()
    }
  }

  const handleGetItems = async () => {
    const response = await fetch('http://localhost:4000/api/items')
    const json = await response.json()

      if (response.ok) {
        setProducts(json)
      }
  }

  const handleGetItem = async (id: string) => {
    const response = await fetch('http://localhost:4000/api/items/' + id)
    const json = await response.json()

    const { itemImage, imageUrl, name, description } = json

    if (response.ok) {
      setItemImage(itemImage)
      setProductName(name)
      setProductDesc(description)
      setBenefits(JSON.parse(json.benefits.toString()))
      setQPs(JSON.parse(json.qp.toString()))
      setItemImageUrl(imageUrl)
    }
  }

  useEffect(() => {
    handleGetItems()
    toggleLoad()
  }, [])

  return (
    <Container my="md" mb={120} className={classes.container}>
      <Grid>
        <Grid.Col span={12}>
          <Skeleton height={TERTIARY_COL_HEIGHT} radius="md" animate={false} visible={loading}>
            <Combobox 
              store={itemCombobox} 
              onOptionSubmit={(val) => {
                setSelId(val)
                handleGetItem(val)
                itemCombobox.closeDropdown()
              }}
            >
              <Combobox.Target>
                <InputBase
                  component="button"
                  type="button"
                  pointer
                  rightSection={<Combobox.Chevron />}
                  rightSectionPointerEvents="none"
                  onClick={() => itemCombobox.toggleDropdown()}
                >
                  {productName || <Input.Placeholder>Choose an Item</Input.Placeholder>}
                </InputBase>
              </Combobox.Target>

              <Combobox.Dropdown>
                <Combobox.Options>{cbOptions}</Combobox.Options>
              </Combobox.Dropdown>
           </Combobox>
          </Skeleton>
        </Grid.Col>
      </Grid>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} visible={loading}>
          <Stack align="center">
            <Group justify="center">
              <Button maw={360} onClick={handleUpdateItem}>Update</Button>
              <Button maw={360} onClick={handleDeleteItem}>Delete</Button>
            </Group>
            <ItemCard image={itemImage} imageUrl={itemImageUrl} name={productName} description={productDesc} sizeOptions={QPs} bennies={benefits} />
          </Stack>
        </Skeleton>
        
        <Grid gutter="md" align="stretch">
          <form onSubmit={handleSaveItem}>
            <Grid.Col>
              <Skeleton height={TERTIARY_COL_HEIGHT} radius="md" animate={false} visible={loading}>
              <FileInput
                w="100%"
                placeholder="Pick an Image"
                label="Image"
                clearable
                accept="image/png,image/jpeg"
                value={itemImage}
                onChange={setItemImage}
              />
              </Skeleton>
              
            </Grid.Col>
            <Grid.Col>
              <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} visible={loading}>
                <TextInput 
                  label="Enter a Product Name"
                  placeholder="Product Name"
                  mb={rem(30)}
                  value={productName}
                  onChange={(event) => setProductName(event.currentTarget.value)}
                />
                <Textarea 
                  label="Enter a Detailed Description"
                  placeholder="Description"
                  autosize={true}
                  minRows={4}
                  maxRows={4}
                  value={productDesc}
                  onChange={(event) => setProductDesc(event.currentTarget.value)}
                />
              </Skeleton>
            </Grid.Col>
            <Center>
              <Grid gutter="md" align="stretch" justify="space-between" className={classes.cWidth}>
                <Grid.Col span={6}>
                  <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} visible={loading}>
                    <Container>
                      <Container>
                        <SegmentedControl 
                          value={sizeSel}
                          onChange={setSizeSel}
                          data={sizes}
                          mb={10}
                        />
                        <NumberInput 
                          radius="md"
                          size="md"
                          placeholder="Price"
                          prefix="$"
                          defaultValue={5.00}
                          decimalScale={2}
                          fixedDecimalScale
                          pb={10}
                          value={newPrice}
                          onChange={setNewPrice}
                        />
                        <Button fullWidth mb={10} onClick={handleAddQPItem}>Add</Button>
                        <InputBase component="div" multiline classNames={{input: classes.qpInput}}>
                          <ScrollArea h={rem(62)} scrollbars="y">
                            <Pill.Group mb={60} className={classes.pillGroup}>
                              {qpList}
                            </Pill.Group>
                          </ScrollArea>
                        </InputBase>
                      </Container>
                    </Container>
                  </Skeleton>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} visible={loading}>
                    <Container>
                      <TextInput 
                        radius="md"
                        size="md"
                        placeholder="New Benefit"
                        mb={10}
                        value={newBenefit}
                        onChange={(e) => setNewBenefit(e.currentTarget.value)}
                        rightSectionWidth={42}
                        rightSection={
                          <ActionIcon size={32} radius="xl" color={theme.colors.pear[9]} variant="filled" onClick={() => handleAddBenefit()}>
                            <IconCirclePlus style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                          </ActionIcon>
                        }
                      />
                      <InputBase component="div" multiline classNames={{input: classes.bInput}}>
                        <ScrollArea h={rem(162)} scrollbars="y">
                          <Pill.Group>
                            {benefitsList}
                          </Pill.Group>
                        </ScrollArea>
                      </InputBase>
                    </Container>
                  </Skeleton>
                </Grid.Col>
              </Grid>
            </Center>
            <Grid.Col>
              <Skeleton height={TERTIARY_COL_HEIGHT} radius="md" animate={false} visible={loading}>
                <Container>
                  <Button fullWidth type="submit">Save Item</Button>
                </Container>
              </Skeleton>
            </Grid.Col>
          </form>
        </Grid>
      </SimpleGrid>
      <Modal 
        opened={opened} 
        onClose={() => {
          setError(null)
          setMsg(null)
          close()
        }} 
        withCloseButton={false} 
        centered
      >
          {!error && <Text size="lg">
            {msg}
          </Text>}
          {error && <Text size="lg">{error}</Text>}
      </Modal>
    </Container>
  );
}