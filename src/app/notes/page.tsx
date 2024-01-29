import Link from "next/link";
import {
    Card,
    CardContent
} from "@/components/ui/card"
import CreateNote from "./[id]/CreateNote";

async function getNotes(): Promise<any[]> {
    const rest = await fetch('http://127.0.0.1:8090/api/collections/notes/records', 
        { cache: 'no-store'}
    );
    const data = await rest.json();
    return data?.items as any[];
}

export default async function NotesPage() {
    const notes = await getNotes();
    return (
      <div>
        <h1>notes</h1>
        {notes?.map((note) => {
            return <Note key={note.id} note={note} />;
        })}
      </div>
    );
  };

function Note({ note }: any) {
    const { id, title, content, created } = note || {};

    return (
        <div>
            <Link href={`/notes/${id}`}>
                <Card className="w-[350px]">
                    <CardContent>
                        <div>
                            <h2>{title}</h2>
                            <h5>{content}</h5>
                            <p>{created}</p>
                        </div>
                    </CardContent>
                </Card>
            </Link>
            <CreateNote />
        </div>
    )
}