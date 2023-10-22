import { FolderOpen } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-2">
      <FolderOpen className="w-40" />
      <h1 className="text-lg font-semibold">Nenhum dado encontrado</h1>
    </div>
  )
}
