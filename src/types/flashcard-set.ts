export interface FlashcardSet {
    id: string;
    title: string;
    description: string;
    cards: {
        word: string;
        translation: string;
    }[];
}
