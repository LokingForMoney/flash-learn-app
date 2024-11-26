'use client'
import { useState } from 'react'
import { getFlashcardSet, addCardToSet } from '@/lib/flashcardSetService'
import Image from 'next/image'
import { useParams } from 'next/navigation'

export default function SetPage() {
    const params = useParams()
    const id = params?.id as string
    
    const [set, setSet] = useState(getFlashcardSet(id))
    const [showForm, setShowForm] = useState(false)
    const [newCard, setNewCard] = useState({ word: '', translation: '' })

    const handleAddCard = (e: React.FormEvent) => {
        e.preventDefault()
        addCardToSet(id, newCard.word, newCard.translation)
        setNewCard({ word: '', translation: '' })
        setShowForm(false)
        setSet(getFlashcardSet(id))
    }

    return (
        <main className="min-h-[100vh] w-full bg-gradient-to-b from-blue-700 via-blue-500 to-sky-400 p-4">
            <div className="bg-white/10 rounded-lg p-4 mb-6">
                <h1 className="text-white text-2xl font-bold">{set.title}</h1>
                <p className="text-white/80 mt-2">{set.description}</p>
            </div>

            <div className="flex justify-end mb-6">
                <button 
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg"
                >
                    <Image
                        src="/free-icon-add-7510850.png"
                        alt="Добавить"
                        width={20}
                        height={20}
                    />
                    Добавить карточку
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleAddCard} className="bg-white rounded-lg p-4 mb-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Слово</label>
                            <input
                                type="text"
                                value={newCard.word}
                                onChange={(e) => setNewCard({...newCard, word: e.target.value})}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Перевод</label>
                            <input
                                type="text"
                                value={newCard.translation}
                                onChange={(e) => setNewCard({...newCard, translation: e.target.value})}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <button 
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Сохранить
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {set.cards.map((card, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                        <h3 className="font-bold">{card.word}</h3>
                        <p className="text-gray-600">{card.translation}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}
