'use client'
import { useState, useRef } from 'react'
import { getFlashcardSet, addCardToSet, deleteCardFromSet, editCardInSet } from '@/lib/flashcardSetService'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { Card } from '@/types/flashcard'

export default function SetPage() {
    const params = useParams()
    const router = useRouter()
    const id = params?.id as string
    const fileInputRef = useRef<HTMLInputElement>(null)
    const mediaRecorder = useRef<MediaRecorder | null>(null)
    
    const [set, setSet] = useState(getFlashcardSet(id))
    const [showForm, setShowForm] = useState(false)
    const [editingCard, setEditingCard] = useState<string | null>(null)
    const [newCard, setNewCard] = useState({ 
        word: '', 
        translation: '', 
        image: null as File | null,
        audio: null as Blob | null
    })
    const [isRecording, setIsRecording] = useState(false)
    const [recordingTime, setRecordingTime] = useState(0)
    const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())
    const timerRef = useRef<NodeJS.Timeout>()

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            mediaRecorder.current = new MediaRecorder(stream)
            const audioChunks: BlobPart[] = []

            mediaRecorder.current.ondataavailable = (event) => {
                audioChunks.push(event.data)
            }

            mediaRecorder.current.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
                setNewCard(prev => ({ ...prev, audio: audioBlob }))
            }

            mediaRecorder.current.start()
            setIsRecording(true)
            
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => {
                    if (prev >= 30) {
                        stopRecording()
                        return prev
                    }
                    return prev + 1
                })
            }, 1000)
        } catch (err) {
            console.error('Ошибка доступа к микрофону:', err)
        }
    }

    const stopRecording = () => {
        if (mediaRecorder.current && isRecording) {
            mediaRecorder.current.stop()
            mediaRecorder.current.stream.getTracks().forEach(track => track.stop())
            setIsRecording(false)
            clearInterval(timerRef.current)
            setRecordingTime(0)
        }
    }

    const handleAddCard = (e: React.FormEvent) => {
        e.preventDefault()
        const newCardData = addCardToSet(id, newCard.word, newCard.translation, newCard.image, newCard.audio)
        setSet(prev => ({
            ...prev,
            cards: [...prev.cards, newCardData]
        }))
        setNewCard({ word: '', translation: '', image: null, audio: null })
        setShowForm(false)
    }

    const handleEditCard = (cardId: string) => {
        const updatedCard = editCardInSet(id, cardId, newCard.word, newCard.translation, newCard.image, newCard.audio)
        if (updatedCard) {
            setSet(prev => ({
                ...prev,
                cards: prev.cards.map(card => 
                    card.id === cardId ? updatedCard : card
                )
            }))
        }
        setEditingCard(null)
        setNewCard({ word: '', translation: '', image: null, audio: null })
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setNewCard({...newCard, image: file})
        }
    }

    const handleDeleteCard = (cardId: string) => {
        deleteCardFromSet(id, cardId)
        setSet(prev => ({
            ...prev,
            cards: prev.cards.filter(card => card.id !== cardId)
        }))
    }

    const toggleCard = (cardId: string) => {
        const newFlipped = new Set(flippedCards)
        if (newFlipped.has(cardId)) {
            newFlipped.delete(cardId)
        } else {
            newFlipped.add(cardId)
        }
        setFlippedCards(newFlipped)
    }

    return (
        <main className="min-h-[100vh] w-full bg-gradient-to-b from-blue-700 via-blue-500 to-sky-400 p-4">
            <div className="max-w-6xl mx-auto relative">
                <button
                    onClick={() => router.push('/')}
                    className="absolute top-0 right-0 bg-white/20 hover:bg-white/30 text-white w-8 h-8 rounded-full flex items-center justify-center"
                >
                    ✕
                </button>

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
                            <div>
                                <label className="block text-gray-700 mb-2">Изображение</label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Аудиозапись перевода</label>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={isRecording ? stopRecording : startRecording}
                                        className={`px-4 py-2 rounded ${
                                            isRecording ? 'bg-red-500' : 'bg-blue-500'
                                        } text-white`}
                                    >
                                        {isRecording ? `Остановить (${30 - recordingTime}с)` : 'Записать'}
                                    </button>
                                    {newCard.audio && (
                                        <audio controls>
                                            <source src={URL.createObjectURL(newCard.audio)} type="audio/wav" />
                                        </audio>
                                    )}
                                </div>
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

                <div className="grid grid-cols-2 gap-4">
                    {set.cards.map((card: Card) => (
                        <div 
                            key={card.id} 
                            className="relative h-64 cursor-pointer group"
                            onClick={() => toggleCard(card.id)}
                        >
                            <div className={`absolute w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                                flippedCards.has(card.id) ? 'rotate-y-180' : ''
                            }`}>
                                <div className="absolute w-full h-full bg-white rounded-lg backface-hidden">
                                    <h3 className="font-bold text-2xl text-center">{card.word}</h3>
                                </div>
                                
                                <div className="absolute w-full h-full bg-white rounded-lg rotate-y-180 backface-hidden">
                                    <div className="flex flex-col h-full">
                                        <p className="text-xl text-center">{card.translation}</p>
                                        {card.imageUrl && (
                                            <div className="relative flex-grow">
                                                <Image
                                                    src={card.imageUrl}
                                                    alt={card.word}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        )}
                                        {card.audioUrl && (
                                            <audio controls className="w-full">
                                                <source src={card.audioUrl} type="audio/wav" />
                                            </audio>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute top-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setEditingCard(card.id);
                                        setNewCard({
                                            word: card.word,
                                            translation: card.translation,
                                            image: null,
                                            audio: null
                                        });
                                    }}
                                    className="bg-blue-500 text-white p-2 rounded-full"
                                >
                                    ✎
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleDeleteCard(card.id);
                                    }}
                                    className="bg-red-500 text-white p-2 rounded-full"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {editingCard && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-4 rounded-lg w-full max-w-md" onClick={e => e.stopPropagation()}>
                            <h3 className="text-xl font-bold mb-4">Редактировать карточку</h3>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleEditCard(editingCard);
                            }}>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value={newCard.word}
                                        onChange={(e) => setNewCard({...newCard, word: e.target.value})}
                                        className="w-full p-2 border rounded"
                                        placeholder="Слово"
                                        required
                                    />
                                    <input
                                        type="text"
                                        value={newCard.translation}
                                        onChange={(e) => setNewCard({...newCard, translation: e.target.value})}
                                        className="w-full p-2 border rounded"
                                        placeholder="Перевод"
                                        required
                                    />
                                    <input
                                        type="file"
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        className="w-full p-2 border rounded"
                                    />
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={isRecording ? stopRecording : startRecording}
                                            className={`px-4 py-2 rounded ${
                                                isRecording ? 'bg-red-500' : 'bg-blue-500'
                                            } text-white`}
                                        >
                                            {isRecording ? `Остановить (${30 - recordingTime}с)` : 'Записать'}
                                        </button>
                                        {newCard.audio && (
                                            <audio controls>
                                                <source src={URL.createObjectURL(newCard.audio)} type="audio/wav" />
                                            </audio>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setEditingCard(null)}
                                        className="px-4 py-2 bg-gray-200 rounded"
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Сохранить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

