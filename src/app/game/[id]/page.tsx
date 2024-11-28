'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getFlashcardSet } from '@/lib/flashcardSetService'
import confetti from 'canvas-confetti'

export default function GamePage() {
    const params = useParams()
    const router = useRouter()
    const [set] = useState(getFlashcardSet(params.id as string))
    const [cards, setCards] = useState<any[]>([])
    const [selectedCards, setSelectedCards] = useState<number[]>([])
    const [matchedPairs, setMatchedPairs] = useState<number[]>([])
    const [stats, setStats] = useState({ correct: 0, incorrect: 0 })
    const [gameComplete, setGameComplete] = useState(false)

    useEffect(() => {
        const gameCards = [...set.cards.map(card => ({
            id: card.id,
            content: card.word,
            type: 'word',
            pairId: card.id
        })), ...set.cards.map(card => ({
            id: card.id + '_trans',
            content: card.translation,
            type: 'translation',
            pairId: card.id
        }))].sort(() => Math.random() - 0.5)
        
        setCards(gameCards)
    }, [set])

    const handleCardClick = (index: number) => {
        if (selectedCards.length === 2 || selectedCards.includes(index) || matchedPairs.includes(index)) return

        const newSelected = [...selectedCards, index]
        setSelectedCards(newSelected)

        if (newSelected.length === 2) {
            const [first, second] = newSelected
            const isMatch = cards[first].pairId === cards[second].pairId && 
                          cards[first].type !== cards[second].type

            setTimeout(() => {
                if (isMatch) {
                    setMatchedPairs([...matchedPairs, first, second])
                    setStats(prev => ({ ...prev, correct: prev.correct + 1 }))
                    
                    if (matchedPairs.length + 2 === cards.length) {
                        setGameComplete(true)
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 }
                        })
                    }
                } else {
                    setStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }))
                }
                setSelectedCards([])
            }, 1000)
        }
    }

    const resetGame = () => {
        setCards(cards.sort(() => Math.random() - 0.5))
        setSelectedCards([])
        setMatchedPairs([])
        setStats({ correct: 0, incorrect: 0 })
        setGameComplete(false)
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-700 via-blue-500 to-sky-400 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-white text-2xl font-bold">{set.title}</h1>
                    <div className="text-white">
                        Правильно: {stats.correct} | Ошибки: {stats.incorrect}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            onClick={() => handleCardClick(index)}
                            className={`
                                aspect-square rounded-lg p-4 cursor-pointer
                                flex items-center justify-center text-center
                                transition-all duration-300 transform
                                ${selectedCards.includes(index) ? 'scale-105' : ''}
                                ${matchedPairs.includes(index) 
                                    ? 'bg-green-400 text-white animate-pulse' 
                                    : selectedCards.includes(index)
                                        ? 'bg-blue-300'
                                        : 'bg-white hover:bg-gray-100'}
                            `}
                        >
                            {card.content}
                        </div>
                    ))}
                </div>
            </div>

            {gameComplete && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 text-center animate-bounce">
                        <h2 className="text-2xl font-bold mb-4">Поздравляем!</h2>
                        <p className="mb-4">
                            Правильных ответов: {stats.correct}<br/>
                            Ошибок: {stats.incorrect}
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={resetGame}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Играть снова
                            </button>
                            <button
                                onClick={() => router.push('/')}
                                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Выйти
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}
