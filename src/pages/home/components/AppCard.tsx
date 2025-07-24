import { Card, Flex } from '@mantine/core';
import { IconArrowRight, IconBarrierBlock } from '@tabler/icons-react';

interface AppCardProps {
    title: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    canAccess?: boolean;
}

function AppCard({ title, onClick, canAccess = false }: AppCardProps) {
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
                {title} {canAccess ? <IconArrowRight /> : <IconBarrierBlock />}
            </Flex>
        </Card>
    )
}

export default AppCard;