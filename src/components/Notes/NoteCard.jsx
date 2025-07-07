import { ActionIcon, Card, Flex, Group, Text, Title } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { useHover } from '@mantine/hooks';

const NoteCard = ({ title, content, onEdit, onDelete, isEditing }) => {
    const { hovered, ref } = useHover();

    return (
        <Card ref={ref} withBorder padding="md" radius="md" style={{
            width: "200px",
            height: '200px'

        }} bg={isEditing ? 'blue' : 'white'}>
            <Flex direction={'column'} style={{ height: '100%' }}>
                <Title order={3}>{title}</Title>
                <Text style={{ flexGrow: '1' }}>{content}</Text>
                {(hovered || isEditing) && <Group style={{ alignSelf: 'flex-end' }}>
                    <ActionIcon variant="outline" aria-label="Delete" onClick={onDelete}>
                        <IconTrash />
                    </ActionIcon>
                    <ActionIcon variant="outline" aria-label="Edit" onClick={onEdit}>
                        <IconEdit />
                    </ActionIcon>
                </Group>}
            </Flex>
        </Card>
    )
}

export default NoteCard