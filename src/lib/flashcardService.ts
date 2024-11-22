import { Flashcard } from "@/types/flashcard";

const flashcards: Flashcard[] = [];

export const addFlashcard = (question: string, answer: string) => {
  flashcards.push({ question, answer });
};

export const fetchFlashcards = async (): Promise<Flashcard[]> => {
  return flashcards;
};
export { flashcards };