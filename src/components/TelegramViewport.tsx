'use client'

import { useEffect } from 'react'

export default function TelegramViewport() {
  useEffect(() => {
    document.documentElement.style.setProperty('--tg-viewport-height', `${window.innerHeight}px`)
    document.documentElement.style.setProperty('--tg-viewport-stable-height', `${window.innerHeight}px`)
  }, [])

  return null
}
