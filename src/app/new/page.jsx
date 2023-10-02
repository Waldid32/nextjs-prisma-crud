"use client"
import { useRouter } from 'next/navigation'

export default function NewPage() {
    const router = useRouter()

    const onSubmit = async (e) => {
        e.preventDefault()
        const title = e.target.title.value
        const description = e.target.description.value

        const res = await fetch('/api/task', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()
        router.push('/')
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <form
                className="bg-slate-700 p-10 lg:w-3/4 md:w-1/2"
                onSubmit={onSubmit}
            >
                <label htmlFor="title" className="font-bold text-sm">Título de la tarea</label>
                <input
                    type="text"
                    className="border border-gray-400 p-2 mb-4 w-full text-black"
                    placeholder="Titulo"
                    id="title"
                />
                <label htmlFor="description" className="font-bold text-sm">Descripción de la tarea</label>

                <textarea
                    cols="3"
                    className="border border-gray-400 p-2 mb-4 w-full text-black"
                    placeholder="Describe tu tarea..."
                    id="description"
                ></textarea>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Crear
                </button>
            </form>
        </div>
    )
}
