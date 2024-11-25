'use client'
import { useState, useEffect } from 'react'
import { getFlashcardSets } from '@/lib/flashcardSetService'
import CreateCards from '@/components/CreateCards'
import FlashcardSetCard from '@/components/FlashcardSetCard'

export default function HomePage() {
    const [sets, setSets] = useState(getFlashcardSets())

    useEffect(() => {
        setSets(getFlashcardSets())
    }, [])

    return (
        <main className="min-h-[100vh] w-full bg-gradient-to-b from-blue-700 via-blue-500 to-sky-400">
            <h1 className="text-white text-2xl font-bold p-4 text-center">
                FlashLearn
            </h1>
            <div className="p-4">
                <CreateCards />
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sets.map(set => (
                        <FlashcardSetCard key={set.id} set={set} />
                    ))}
                </div>
            </div>
        </main>
    )
}
