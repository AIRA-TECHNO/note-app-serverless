
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Index() {
    /**
     * Init state variable
     */
    const [ListNotes, setListNotes] = useState([])


    /**
     * Get data from local storage on first load
     */
    useEffect(() => {
        try {
            const storageNotes = localStorage.getItem('notes')
            setListNotes(JSON.parse(storageNotes))
        } catch (error) { }
    }, [])


    /**
     * Handling delete data
     */
    function onDeleteNote(noteId) {
        const newListNotes = ListNotes.filter((note) => (note.id != noteId))
        localStorage.setItem(
            'notes',
            JSON.stringify(newListNotes)
        )
        setListNotes(newListNotes)
    }


    /**
     * Render JSX
     */
    return (
        <div className="container mx-auto sm:px-4 py-6">
            <div className="flex items-end mb-4">
                <div className="text-xl">Daftar Catatan</div>
                <div className="ml-auto">
                    <Link href='/note/new-note'>
                        <div className="bg-amber-400 px-4 py-2 text-xs rounded-md">
                            Catatan Baru
                        </div>
                    </Link>
                </div>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                {ListNotes?.map((note, indexNote) => (
                    <Link href={`/note/${note.id}`} key={indexNote}>
                        <div className="group/card border hover:shadow rounded-md cursor-pointer px-4 py-2">
                            <div className="whitespace-nowrap truncate font-semibold">{note.title}</div>
                            <div>{note.content}</div>
                            <div
                                className="text-xs px-2 py-[.12rem] rounded text-red-500 bg-red-50 hover:bg-red-100 group-hover/card:visible invisible inline-block mt-2"
                                onClick={(e) => {
                                    e.preventDefault()
                                    onDeleteNote(note.id)
                                }}
                            >hapus</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
