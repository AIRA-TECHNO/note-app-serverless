
import { useRouter } from "next/dist/client/router"
import Link from "next/link"
import { useEffect, useState } from "react"
import Error from 'next/error'


export default function Detail() {
    const router = useRouter()
    const { idNote } = router.query
    const [statusCode, setStatusCode] = useState(202)
    const [Note, setNote] = useState({})



    useEffect(() => {
        if (router.isReady) {
            // Get data from local storage
            let storageNotes = []
            try {
                storageNotes = JSON.parse(localStorage.getItem('notes'))
            } catch (error) { }

            if (idNote == 'new-note') {
                setNote({
                    id: Date.now()
                })
            } else {
                // Check isset exist data
                const existNote = storageNotes.filter((note) => (note.id == idNote))?.[0]
                if (existNote) {
                    setNote(existNote)
                } else {
                    setStatusCode(404)
                }
            }
        }
    }, [router])



    useEffect(() => {
        if (Note?.id) {
            // Get data from local storage
            let storageNotes = []
            try {
                storageNotes = JSON.parse(localStorage.getItem('notes'))
            } catch (error) { }

            // Add new data to local storage
            const newNote = (Note?.title || Note?.content) ? [Note] : []
            localStorage.setItem(
                'notes',
                JSON.stringify([
                    ...(storageNotes?.filter((note) => (note.id != Note.id)) ?? []),
                    ...newNote
                ])
            )
        }
    }, [Note])


    if (![200, 202].includes(statusCode)) {
        return <Error statusCode={statusCode} />
    }

    return (
        <div className="container mx-auto sm:px-4 pt-6">
            <div className="flex items-center text-lg">
                <Link href='/note' className="text-3xl ">
                    <div className="flex items-center justify-center rounded-full h-9 aspect-square hover:bg-amber-100  ">
                        <div className="mb-[.3rem]">&#8249;</div>
                    </div>
                </Link>
                <div>Field Catatan</div>
            </div>
            <div className="bg-amber-100 overflow-y-auto rounded-md mt-2 px-4" style={{ height: 'calc(100vh - 5rem)' }}>
                <input
                    className="w-full bg-transparent font-bold border-b border-gray-300 mb-2 mt-3 pb-1 focus:outline-none"
                    value={(Note?.title ?? '')}
                    placeholder='Judul Catatan'
                    onChange={(e) => { setNote((prev) => ({ ...prev, title: e.target.value })) }}
                />
                <textarea
                    className="w-full bg-transparent p-0 border-none resize-none focus:outline-none"
                    style={{ height: 'calc(100% - 4.5rem)' }}
                    onChange={(e) => {
                        let content = e.target.value
                        if (e.key == 13) {
                            content += "\n*"
                        }
                        setNote((prev) => ({ ...prev, content }))
                    }}
                    placeholder="Tulis sesuatu..."
                    value={Note?.content ?? ''}
                />
            </div>
        </div>
    )
}
