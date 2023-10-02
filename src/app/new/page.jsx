"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function NewPage({ params }) {

    const router = useRouter();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (params.id) {
            fetch(`/api/task/${params.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setTitle(data.title)
                    setDescription(data.description)
                })
        }
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()

        if (params.id) {
            const res = await fetch(`/api/task/${params.id}`, {
                method: "PUT",
                body: JSON.stringify({ title, description }),
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            const data = await res.json()
        } else {
            const res = await fetch('/api/task', {
                method: 'POST',
                body: JSON.stringify({ title, description }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
        }
        router.refresh()
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
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="description" className="font-bold text-sm">Descripción de la tarea</label>

                <textarea
                    cols="3"
                    className="border border-gray-400 p-2 mb-4 w-full text-black"
                    placeholder="Describe tu tarea..."
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                ></textarea>
                <div className='flex justify-between'>
                    <button
                        type='submit'
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Crear
                    </button>
                    {
                        params.id && (
                            <button
                                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded '
                                type='button'
                                onClick={async () => {
                                    const res = await fetch(`/api/task/${params.id}`, {
                                        method: "DELETE",

                                    })
                                    const data = await res.json()
                                    router.refresh()
                                    router.push('/')
                                }}
                            >
                                Delete
                            </button>
                        )
                    }
                </div>
            </form>
        </div>
    )
}
