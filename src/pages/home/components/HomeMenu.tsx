import { Center, Container, Flex } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import AppCard from '@/pages/home/components/AppCard';

function HomeMenu() {
    const navigate = useNavigate()

    return (
        <Container>
            <Center>
                <Flex gap={10} mt={20}>
                    <AppCard title='Basic Note App' canAccess onClick={() => navigate("/notes")} />
                    <AppCard title='Short URL App' />
                    <AppCard title='Shuttle Booking App' />
                </Flex>
            </Center>
        </Container>
    )
}

export default HomeMenu