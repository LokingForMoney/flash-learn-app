export interface Flashcard {
    question: string;
    answer: string;
}

export interface Card {
    id: string;
    word: string;
    translation: string;
    imageUrl?: string;
    audioUrl?: string;
}

export interface FlashcardSet {
    id: string;
    title: string;
    description: string;
    isPinned: boolean;
    cards: Card[];
}
