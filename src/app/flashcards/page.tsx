'use client'
import { useEffect, useState } from 'react';
import { Flashcard } from '@/types/flashcard';
import { fetchFlashcards } from '@/lib/flashcardService';

const FlashcardsPage = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    const loadFlashcards = async () => {
      const cards = await fetchFlashcards();
      setFlashcards(cards);
    };
    loadFlashcards();
  }, []);

  return (
    <div>
      <h1>Все флеш-карточки</h1>
      <ul>
        {flashcards.map((card, index) => (
          <li key={index}>
            <strong>Вопрос:</strong> {card.question} <br />
            <strong>Ответ:</strong> {card.answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlashcardsPage;