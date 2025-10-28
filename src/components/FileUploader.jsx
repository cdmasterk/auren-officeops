import React from 'react'
export default function FileUploader() {
  return (
    <div className="p-3 border rounded-xl bg-white">
      <input type="file" multiple className="block w-full text-sm text-muted" />
      <p className="text-xs mt-1 text-muted">AI will auto-tag documents upon upload.</p>
    </div>
  )
}
