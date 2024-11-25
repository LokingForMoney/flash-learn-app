'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function CreateCards() {
    const router = useRouter()

    const handleClick = () => {
        router.push('/create-set')
    }

    return (
        <div 
            className="flex flex-col items-center justify-center cursor-pointer" 
            onClick={handleClick}
        >
            <Image
                src="/free-icon-add-7510850.png"
                alt="плюс"
                width={50}
                height={50}
            />
        </div>
    );
}
