// 'use client'
// import { useState } from 'react'
// import { getFlashcardSets, deleteFlashcardSet, togglePinSet } from '@/lib/flashcardSetService'
// import Link from 'next/link'
// import CreateCards from '@/components/CreateCards'

// export default function HomePage() {
//     const [sets, setSets] = useState(getFlashcardSets())

//     const handleDelete = (id: string) => {
//         deleteFlashcardSet(id)
//         setSets(getFlashcardSets())
//     }

//     const handlePin = (id: string) => {
//         togglePinSet(id)
//         setSets(getFlashcardSets())
//     }

//     return (
//         <main className="min-h-[100vh] w-full bg-gradient-to-b from-blue-700 via-blue-500 to-sky-400 p-4">
//              <h1 className="text-white text-3xl font-bold text-center mb-6">
//                 FlashLearn
//             </h1>
//             <div className="mb-6">
//                 <CreateCards />
//             </div>
            
//             <div className="grid gap-4">
//                 {sets.map(set => (
//                     <div key={set.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
//                         <div>
//                             <h2 className="font-bold text-xl">
//                                 {set.isPinned && '📌 '}
//                                 {set.title}
//                             </h2>
//                             <p className="text-gray-600">{set.description}</p>
//                         </div>
//                         <div className="flex gap-2">
//                             <button
//                                 onClick={() => handlePin(set.id)}
//                                 className="p-2 rounded bg-blue-100 hover:bg-blue-200"
//                             >
//                                 {set.isPinned ? 'Открепить' : 'Закрепить'}
//                             </button>
//                             <button
//                                 onClick={() => handleDelete(set.id)}
//                                 className="p-2 rounded bg-red-100 hover:bg-red-200"
//                             >
//                                 Удалить
//                             </button>
//                             <Link
//                                 href={`/sets/${set.id}`}
//                                 className="p-2 rounded bg-green-100 hover:bg-green-200"
//                             >
//                                 Открыть
//                             </Link>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </main>
//     )
// }
// 'use client'
// import { useState } from 'react'
// import { getFlashcardSets, deleteFlashcardSet, togglePinSet, editFlashcardSet } from '@/lib/flashcardSetService'
// import Link from 'next/link'
// import CreateCards from '@/components/CreateCards'

// export default function HomePage() {
//     const [sets, setSets] = useState(getFlashcardSets())
//     const [editingSet, setEditingSet] = useState(null)
//     const [editForm, setEditForm] = useState({
//         title: '',
//         description: '',
//         isPinned: false
//     })

//     const handleDelete = (id: string) => {
//         deleteFlashcardSet(id)
//         setSets(getFlashcardSets())
//     }

//     const handlePin = (id: string) => {
//         togglePinSet(id)
//         setSets(getFlashcardSets())
//     }

//     const startEditing = (set) => {
//         setEditingSet(set.id)
//         setEditForm({
//             title: set.title,
//             description: set.description,
//             isPinned: set.isPinned
//         })
//     }

//     const handleEdit = (e: React.FormEvent) => {
//         e.preventDefault()
//         const updatedSets = editFlashcardSet(
//             editingSet,
//             editForm.title,
//             editForm.description,
//             editForm.isPinned
//         )
//         setSets(updatedSets)
//         setEditingSet(null)
//     }

//     return (
//         <main className="min-h-[100vh] w-full bg-gradient-to-b from-blue-700 via-blue-500 to-sky-400 p-4">
//             <h1 className="text-white text-3xl font-bold text-center mb-6">
//                 FlashLearn
//             </h1>
//             <div className="mb-6">
//                 <CreateCards />
//             </div>
           
//             <div className="grid gap-4">
//                 {sets.map(set => (
//                     <div key={set.id} className="bg-white p-4 rounded-lg shadow">
//                         {editingSet === set.id ? (
//                             <form onSubmit={handleEdit} className="space-y-4">
//                                 <input
//                                     type="text"
//                                     value={editForm.title}
//                                     onChange={(e) => setEditForm({...editForm, title: e.target.value})}
//                                     className="w-full p-2 border rounded"
//                                     required
//                                 />
//                                 <textarea
//                                     value={editForm.description}
//                                     onChange={(e) => setEditForm({...editForm, description: e.target.value})}
//                                     className="w-full p-2 border rounded"
//                                     rows={2}
//                                 />
//                                 <div className="flex items-center">
//                                     <input
//                                         type="checkbox"
//                                         checked={editForm.isPinned}
//                                         onChange={(e) => setEditForm({...editForm, isPinned: e.target.checked})}
//                                         className="mr-2"
//                                     />
//                                     <label>Закрепить набор</label>
//                                 </div>
//                                 <div className="flex gap-2">
//                                     <button
//                                         type="submit"
//                                         className="p-2 rounded bg-green-100 hover:bg-green-200"
//                                     >
//                                         Сохранить
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => setEditingSet(null)}
//                                         className="p-2 rounded bg-gray-100 hover:bg-gray-200"
//                                     >
//                                         Отмена
//                                     </button>
//                                 </div>
//                             </form>
//                         ) : (
//                             <div className="flex justify-between items-center">
//                                 <div>
//                                     <h2 className="font-bold text-xl">
//                                         {set.isPinned && '📌 '}
//                                         {set.title}
//                                     </h2>
//                                     <p className="text-gray-600">{set.description}</p>
//                                 </div>
//                                 <div className="flex gap-2">
//                                     <button
//                                         onClick={() => startEditing(set)}
//                                         className="p-2 rounded bg-yellow-100 hover:bg-yellow-200"
//                                     >
//                                         Изменить
//                                     </button>
//                                     <button
//                                         onClick={() => handlePin(set.id)}
//                                         className="p-2 rounded bg-blue-100 hover:bg-blue-200"
//                                     >
//                                         {set.isPinned ? 'Открепить' : 'Закрепить'}
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(set.id)}
//                                         className="p-2 rounded bg-red-100 hover:bg-red-200"
//                                     >
//                                         Удалить
//                                     </button>
//                                     <Link
//                                         href={`/sets/${set.id}`}
//                                         className="p-2 rounded bg-green-100 hover:bg-green-200"
//                                     >
//                                         Открыть
//                                     </Link>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//       <Link
//           href={`/game/${set.id}`}
//           className="p-2 rounded bg-green-100 hover:bg-green-200 ml-2"
//       >
//           Играть
//       </Link>


//         </main>
//     )
// }
'use client'
import { useState } from 'react'
import { getFlashcardSets, deleteFlashcardSet, togglePinSet, editFlashcardSet } from '@/lib/flashcardSetService'
import Link from 'next/link'
import CreateCards from '@/components/CreateCards'
import { FlashcardSet } from '@/types/flashcard'

export default function HomePage() {
    const [sets, setSets] = useState(getFlashcardSets())
    const [editingSet, setEditingSet] = useState<string | null>(null)
    const [editForm, setEditForm] = useState({
        title: '',
        description: '',
        isPinned: false
    })

    const handleDelete = (id: string) => {
        deleteFlashcardSet(id)
        setSets(getFlashcardSets())
    }

    const handlePin = (id: string) => {
        togglePinSet(id)
        setSets(getFlashcardSets())
    }

    const startEditing = (set: FlashcardSet) => {
        setEditingSet(set.id)
        setEditForm({
            title: set.title,
            description: set.description,
            isPinned: set.isPinned
        })
    }

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault()
        if (editingSet) {
            const updatedSets = editFlashcardSet(
                editingSet,
                editForm.title,
                editForm.description,
                editForm.isPinned
            )
            setSets(updatedSets)
            setEditingSet(null)
        }
    }

    return (
        <main className="min-h-[100vh] w-full bg-gradient-to-b from-blue-700 via-blue-500 to-sky-400 p-4">
            <h1 className="text-white text-3xl font-bold text-center mb-6">
                FlashLearn
            </h1>
            <div className="mb-6">
                <CreateCards />
            </div>
           
            <div className="grid gap-4">
                {sets.map(set => (
                    <div key={set.id} className="bg-white p-4 rounded-lg shadow">
                        {editingSet === set.id ? (
                            <form onSubmit={handleEdit} className="space-y-4">
                                <input
                                    type="text"
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <textarea
                                    value={editForm.description}
                                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    rows={2}
                                />
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={editForm.isPinned}
                                        onChange={(e) => setEditForm({...editForm, isPinned: e.target.checked})}
                                        className="mr-2"
                                    />
                                    <label>Закрепить набор</label>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="submit"
                                        className="p-2 rounded bg-green-100 hover:bg-green-200"
                                    >
                                        Сохранить
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditingSet(null)}
                                        className="p-2 rounded bg-gray-100 hover:bg-gray-200"
                                    >
                                        Отмена
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                                <div>
                                    <h2 className="font-bold text-xl mb-2">
                                        {set.isPinned && '📌 '}
                                        {set.title}
                                    </h2>
                                    <p className="text-gray-600">{set.description}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => startEditing(set)}
                                        className="p-2 rounded bg-yellow-100 hover:bg-yellow-200"
                                    >
                                        Изменить
                                    </button>
                                    <button
                                        onClick={() => handlePin(set.id)}
                                        className="p-2 rounded bg-blue-100 hover:bg-blue-200"
                                    >
                                        {set.isPinned ? 'Открепить' : 'Закрепить'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(set.id)}
                                        className="p-2 rounded bg-red-100 hover:bg-red-200"
                                    >
                                        Удалить
                                    </button>
                                    <Link
                                        href={`/sets/${set.id}`}
                                        className="p-2 rounded bg-green-100 hover:bg-green-200"
                                    >
                                        Открыть
                                    </Link>
                                    {set.cards.length > 0 ? (
                                        <Link
                                            href={`/game/${set.id}`}
                                            className="p-2 rounded bg-purple-100 hover:bg-purple-200"
                                        >
                                            Играть ({set.cards.length})
                                        </Link>
                                    ) : (
                                        <span className="p-2 rounded bg-gray-100 text-gray-500">
                                            Добавьте карточки
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </main>
    )
}
