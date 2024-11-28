import { FlashcardSet } from '@/types/flashcard'
import Link from 'next/link'

export default function FlashcardSetCard({ set }: { set: FlashcardSet }) {
    return (
        <Link href={`/sets/${set.id}`}>
            <div className="bg-white rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg">{set.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{set.description}</p>
                <div className="mt-2 text-sm text-blue-600">
                    Карточек: {set.cards.length}
                </div>
            </div>
        </Link>
    )
}
