'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addFlashcardSet } from '@/lib/flashcardSetService'

export default function CreateSetPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        addFlashcardSet(formData.title, formData.description)
        router.push('/')
    }

    return (
        <main className="min-h-[100vh] w-full bg-gradient-to-b from-blue-700 via-blue-500 to-sky-400 p-4">
            <h1 className="text-white text-2xl font-bold mb-6">Создание набора</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-white mb-2">Название набора</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-white mb-2">Описание</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full p-2 rounded"
                        rows={4}
                    />
                </div>

                <button 
                    type="submit"
                    className="bg-white text-blue-700 px-4 py-2 rounded font-bold hover:bg-blue-100"
                >
                    Создать набор
                </button>
            </form>
        </main>
    )
}
