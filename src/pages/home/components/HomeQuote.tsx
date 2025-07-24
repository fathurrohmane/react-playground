import { Blockquote, Center, Text } from '@mantine/core';

function HomeQuote() {
    return (
        <Center mt={100}>
            <Blockquote color="dark" cite="– malubertanya.com">
                <Text>Malu bertanya? <span style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>
                    Sesat di jalan
                </span> Tanya ChatGPT</Text>
            </Blockquote>
        </Center>
    )
}

export default HomeQuote;
