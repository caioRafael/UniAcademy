'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import hero from '@/assets/hero-congratulations.png'
import { useRouter } from 'next/navigation'
import { BASE_URL } from '@/lib/api/api'

const feedback = ({ params }: { params: { id: string } }) => {
  // eslint-disable-next-line
  const router = useRouter()

  return (
    <div className="flex flex-col items-center mt-24 w-full px-2">
      <div className="font-medium text-xs text-black">
        <h1 className="font-normal text-3xl text-black text-center">
          <span className="text-darkRed font-bold">Parabéns</span>, você
          concluiu o curso!
        </h1>
        <p className="font-medium text-xs mt-2 mb-10">
          O certificado de conclusão do curso está disponível. Você pode baixar
          agora ou posteriormente no seu perfil!
        </p>
        <div className="flex items-center justify-center gap-6 mb-11">
          <Button
            className="border-solid border-darkRed border text-darkRed font-medium text-xs py-2 px-4 rounded bg-white"
            asChild
          >
            <a
              href={`${BASE_URL}api/certificados/${params.id}/download`}
              target="_blank"
            >
              Baixar Certificado
            </a>
          </Button>
          <Button
            className="text-white bg-black rounded-sm py-2 px-8 font-medium text-xs self-end"
            onClick={() => router.push('/home')}
          >
            Página Inicial
          </Button>
        </div>
        <div className="mb-12 mx-auto">
          <Image src={hero} alt="Hero" width={900} height={464} />
        </div>
      </div>
    </div>
  )
}

export default feedback
