"use client";
import { useState } from 'react';

const FlashcardForm = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, answer }),
    });
    if (response.ok) {
      alert('Флеш-карточка создана!');
      setQuestion('');
      setAnswer('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Вопрос"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Ответ"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <button type="submit">Создать карточку</button>
    </form>
  );
};

export default FlashcardForm;