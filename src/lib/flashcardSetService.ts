import { FlashcardSet } from "@/types/flashcard-set";

const getStoredSets = (): FlashcardSet[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('flashcardSets');
    return stored ? JSON.parse(stored) : [];
};

const saveSets = (sets: FlashcardSet[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('flashcardSets', JSON.stringify(sets));
    }
};

export const addFlashcardSet = (title: string, description: string): FlashcardSet => {
    const sets = getStoredSets();
    const newSet: FlashcardSet = {
        id: Date.now().toString(),
        title,
        description,
        cards: []
    };
    sets.push(newSet);
    saveSets(sets);
    return newSet;
};

export const getFlashcardSet = (id: string): FlashcardSet => {
    const sets = getStoredSets();
    return sets.find(set => set.id === id) || { id: '', title: '', description: '', cards: [] };
};

export const addCardToSet = (setId: string, word: string, translation: string) => {
    const sets = getStoredSets();
    const setIndex = sets.findIndex(set => set.id === setId);
    if (setIndex !== -1) {
        sets[setIndex].cards.push({ word, translation });
        saveSets(sets);
    }
};

export const getFlashcardSets = (): FlashcardSet[] => {
    return getStoredSets();
};
