import { Anchor, Blockquote, Box, Card, Center, Container, Flex, Image, Mark, Text, Title } from '@mantine/core';
import logo from "../../resource/logo.png";
import { IconArrowRight, IconBarrierBlock } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export function Welcome() {
  const navigate = useNavigate()

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: "column", marginTop: "120px" }}>
        <Box
          style={{
            width: 240,
            height: 240,
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <Image
            src={logo}
            alt="Circular"
            width="100%"
            height="100%"
            fit="cover"
          />
        </Box>
      </div>
      <Title size={36} ta="center" mt={40}>
        Welcome to <Mark>Fathurrohman Elkusnandi's</Mark> Playground
      </Title>
      <Center mt={20}>
        <Text style={{}}>Creating fullstack app for learning purposes. Click here to access <Anchor href="https://www.malubertanya.com/swagger-ui/index.html" target="_blank">
          API documentation
        </Anchor></Text>
      </Center>
      <Container>
        <Center>
          <Flex gap={10} mt={20}>
            <AppCard title='Basic Note App' onClick={() => {
              navigate("/notes")
            }} canAccess />
            <AppCard title='Short URL App' onClick={() => {
              navigate("/notes")
            }} />
            <AppCard title='Shuttle Booking App' onClick={() => {
              navigate("/notes")
            }} />
          </Flex>
        </Center>
      </Container>

      <Center mt={100}>
        <Blockquote color="dark" cite="– malubertanya.com">
          <Text style={{}}>Malu bertanya? <span style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>
            Sesat di jalan
          </span> Tanya ChatGPT</Text>
        </Blockquote>
      </Center>
    </>
  );
}

function AppCard({ title, onClick, canAccess = false }) {
  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder onClick={onClick}>
      <Flex
        mih={20}
        gap="md"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="wrap"
      >
        {title} {canAccess ? <IconArrowRight></IconArrowRight> : <IconBarrierBlock></IconBarrierBlock>}
      </Flex>
    </Card>
  )
}