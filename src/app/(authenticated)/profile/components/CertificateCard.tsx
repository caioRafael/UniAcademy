import { Button } from '@/components/ui/button'
import { Download, FileBadge } from 'lucide-react'

export function CertificateCard() {
  return (
    <div className="flex flex-row items-center justify-between p-3 w-full">
      <div className="flex flex-row gap-3 items-center">
        <div className="flex w-14 h-10 rounded-full items-center justify-center bg-green-200 text-green-400">
          <FileBadge />
        </div>
        <p>Estruturas de dados com JavaScript: aprenda um pouco mais</p>
      </div>
      <Button className="border-none text-darkRed" variant={'outline'}>
        <Download />
        <p>Baixar</p>
      </Button>
    </div>
  )
}
