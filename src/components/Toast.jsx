import React, { useEffect } from 'react'

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  if (!message) return null

  return (
    <div className="fixed bottom-6 right-6 bg-auren-blue text-white px-4 py-2 rounded-xl shadow-lg animate-fade-in">
      {message}
    </div>
  )
}
