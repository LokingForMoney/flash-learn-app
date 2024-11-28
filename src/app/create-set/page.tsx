'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addFlashcardSet } from '@/lib/flashcardSetService'

export default function CreateSetPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        isPinned: false
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        addFlashcardSet(formData.title, formData.description, formData.isPinned)
        router.push('/')
    }

    return (
        <main className="min-h-[100vh] w-full bg-gradient-to-b from-blue-700 via-blue-500 to-sky-400 p-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-white text-3xl font-bold text-center mb-8">
                    Создание нового набора
                </h1>
                
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-white text-lg font-medium">
                                Название набора
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="w-full p-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                                placeholder="Введите название набора"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-white text-lg font-medium">
                                Описание
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full p-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                                rows={4}
                                placeholder="Добавьте описание набора"
                            />
                        </div>

                        <div className="flex items-center space-x-3 py-2">
                            <input
                                type="checkbox"
                                id="isPinned"
                                checked={formData.isPinned}
                                onChange={(e) => setFormData({...formData, isPinned: e.target.checked})}
                                className="w-5 h-5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-400 focus:ring-offset-0"
                            />
                            <label htmlFor="isPinned" className="text-white text-lg">
                                Закрепить набор
                            </label>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => router.push('/')}
                                className="flex-1 px-6 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition duration-200"
                            >
                                Отмена
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition duration-200"
                            >
                                Создать набор
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
