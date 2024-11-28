import { FlashcardSet, Card } from '@/types/flashcard';

const STORAGE_KEY = 'flashcard_sets';

const loadSets = (): FlashcardSet[] => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
};

const saveSets = (sets: FlashcardSet[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sets));
};

let sets: FlashcardSet[] = loadSets();

export const addFlashcardSet = (title: string, description: string, isPinned: boolean = false) => {
    const id = Date.now().toString();
    const newSet = {
        id,
        title,
        description,
        isPinned,
        cards: []
    };
    sets.push(newSet);
    saveSets(sets);
    return id;
};

export const getFlashcardSet = (id: string) => {
    return sets.find(set => set.id === id) || { 
        id: '', 
        title: '', 
        description: '', 
        isPinned: false, 
        cards: [] 
    };
};


export const deleteCardFromSet = (setId: string, cardId: string) => {
    const set = sets.find(set => set.id === setId);
    if (set) {
        set.cards = set.cards.filter(card => card.id !== cardId);
        saveSets(sets);
    }
};

export const deleteFlashcardSet = (id: string) => {
    sets = sets.filter(set => set.id !== id);
    saveSets(sets);
};

export const togglePinSet = (id: string) => {
    const set = sets.find(set => set.id === id);
    if (set) {
        set.isPinned = !set.isPinned;
        saveSets(sets);
    }
};

export const getFlashcardSets = () => {
    sets = loadSets();
    return [...sets].sort((a, b) => {
        if (a.isPinned === b.isPinned) return 0;
        return a.isPinned ? -1 : 1;
    });
};
// Добавляем поддержку аудио в функцию addCardToSet
export const addCardToSet = (
    setId: string, 
    word: string, 
    translation: string, 
    image: File | null,
    audio: Blob | null
) => {
    const set = sets.find(set => set.id === setId);
    if (set) {
        const cardId = Date.now().toString();
        const imageUrl = image ? URL.createObjectURL(image) : undefined;
        const audioUrl = audio ? URL.createObjectURL(audio) : undefined;
        
        const newCard = { 
            id: cardId, 
            word, 
            translation, 
            imageUrl, 
            audioUrl 
        };
        
        set.cards.push(newCard);
        saveSets(sets);
        return newCard;
    }
};
export const editFlashcardSet = (id: string, title: string, description: string, isPinned: boolean) => {
    const sets = getFlashcardSets();
    const setIndex = sets.findIndex(set => set.id === id);
    if (setIndex !== -1) {
        sets[setIndex] = { ...sets[setIndex], title, description, isPinned };
        localStorage.setItem('flashcard_sets', JSON.stringify(sets));
    }
    return sets;
};

// Добавляем новую функцию для редактирования карточки
export const editCardInSet = (
    setId: string,
    cardId: string,
    word: string,
    translation: string,
    image: File | null,
    audio: Blob | null
) => {
    const set = sets.find(set => set.id === setId);
    if (set) {
        const cardIndex = set.cards.findIndex(card => card.id === cardId);
        if (cardIndex !== -1) {
            const imageUrl = image ? URL.createObjectURL(image) : set.cards[cardIndex].imageUrl;
            const audioUrl = audio ? URL.createObjectURL(audio) : set.cards[cardIndex].audioUrl;
            
            set.cards[cardIndex] = {
                ...set.cards[cardIndex],
                word,
                translation,
                imageUrl,
                audioUrl
            };
            
            saveSets(sets);
            return set.cards[cardIndex];
        }
    }
};
