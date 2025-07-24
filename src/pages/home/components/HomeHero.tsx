import { Anchor, Center, Image, Box, Mark, Text, Title } from '@mantine/core';
import logo from "../../../resource/logo.png";

function HomeHero() {
    return (
        <>
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: "column", marginTop: "120px" }}>
                <Box
                    style={{
                        width: 240,
                        height: 240,
                        borderRadius: '50%',
                        overflow: 'hidden',
                    }}>
                    <Image
                        src={logo}
                        alt="Circular"
                        width="100%"
                        height="100%"
                        fit="cover"
                    />
                </Box>
            </Box>
            <Title size={36} ta="center" mt={40}>
                Welcome to <Mark color='red'>Fathurrohman Elkusnandi's</Mark> Playground
            </Title>
            <Center mt={20}>
                <Text>Creating fullstack app for learning purposes. Click here to access <Anchor href="https://api.malubertanya.com/swagger-ui/index.html" target="_blank">
                    API documentation
                </Anchor></Text>
            </Center>
        </>
    )
}

export default HomeHero;