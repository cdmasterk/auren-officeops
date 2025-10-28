import React, { useEffect, useState } from 'react'

export default function AIActivityIndicator({ isActive = false, label = 'AI Agent Active' }) {
  const [active, setActive] = useState(isActive)

  useEffect(() => {
    if (isActive) {
      setActive(true)
      const t = setTimeout(() => setActive(false), 2500)
      return () => clearTimeout(t)
    }
  }, [isActive])

  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-3 z-50">
      <div
        className={`w-4 h-4 rounded-full transition-all duration-500 ${
          active ? 'bg-auren-blue shadow-[0_0_12px_3px_rgba(0,144,229,0.6)] animate-pulse' : 'bg-gray-300'
        }`}
      ></div>
      <span
        className={`text-sm ${
          active ? 'text-auren-blue font-medium' : 'text-gray-400'
        } transition-all duration-500`}
      >
        {active ? 'AI Agent Syncing...' : label}
      </span>
    </div>
  )
}
