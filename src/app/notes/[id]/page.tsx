import { Card, CardContent } from "@/components/ui/card";

interface Note {
  id: string;
  title: string;
  content: string;
  created: string;
}

async function getNote(noteId: string): Promise<Note[]> {
  const rest = await fetch(`http://127.0.0.1:8090/api/collections/notes/records/${noteId}`, {
    next: { revalidate: 10 },
  });
  const data = [await rest.json()];
  console.log('Data: ', data as Note[]);
  return data;
}

export default async function NotePage({ params }: any) {
  try {
    const notes: Note[] = await getNote(params.id);

    if (notes.length === 0 || !notes[0].id) {
      return <div>Note not found</div>;
    }

    const note: Note = notes[0];

    return (
      <div>
        <h1>notes/{note.id}</h1>
        <Card className="w-[350px]">
          <CardContent>
            <div>
              <h2>{note.title}</h2>
              <h5>{note.content}</h5>
              <p>{note.created}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error("Error fetching note:", error);
    return <div>Error fetching note</div>;
  }
}