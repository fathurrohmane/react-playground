import { Button, Card } from "@mantine/core"
import { useState } from "react"

const NoteCard = ({ title, content, onEdit, onDelete }) => {
    const [cTitle, setTitle] = useState(title)
    const [cContent, setContent] = useState(content)
    const [isEdit, setEdit] = useState(false)

    return (
        <Card withBorder padding="lg" radius="md" style={{
            padding: "8px",
            width: "200px",
            gap: "4px",
        }}>
            {
                isEdit ?
                    <>
                        <form style={{ display: 'flex', flexDirection: "column", width: "400px" }}>
                            <input id='title' type="text" placeholder='Title' value={cTitle} onChange={(e) => setTitle(e.target.value)} />
                            <input id='content' type="text" placeholder='Content' value={cContent} onChange={(e) => setContent(e.target.value)} />
                        </form>
                    </> :
                    <>
                        <h3>{title}</h3>
                        <p>{content}</p>
                        <Button variant="outline" onClick={onDelete}>Delete</Button>
                    </>
            }

            <Button onClick={() => {
                if (isEdit) {
                    onEdit(cTitle, cContent);
                    setEdit(false);
                } else {
                    setEdit(true);
                }
            }}>{isEdit ? "Done" : "Edit"}</Button>
        </Card>
    )
}

export default NoteCard