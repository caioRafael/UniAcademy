'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import hero from '@/assets/hero-congratulations.png'
import { useState } from 'react'

function feedback() {
  // eslint-disable-next-line
  const [showCongratulations, setShowCongratulations] = useState<boolean>(false)

  const handleClick = () => {
    setShowCongratulations(true)
  }

  const Congratulations = () => {
    return (
      <div className="font-medium text-xs text-black">
        <h1 className="font-normal text-3xl text-black text-center">
          <span className="text-darkRed">Parabéns Fulano</span>, você concluiu o
          curso!
        </h1>
        <p className="font-medium text-xs mt-2 mb-10">
          O certificado de conclusão do curso está disponível. Você pode baixar
          agora ou posteriormente no seu perfil!
        </p>
        <div className="flex items-center justify-center gap-6 mb-11">
          <Button className="border-solid border-darkRed border text-darkRed font-medium text-xs py-2 px-4 rounded bg-white">
            Baixar Certificado
          </Button>
          <Button className="text-white bg-black rounded-sm py-2 px-8 font-medium text-xs self-end">
            Página Inicial
          </Button>
        </div>
        <div className="mb-12 mx-auto">
          <Image src={hero} alt="Hero" width={900} height={464} />
        </div>
      </div>
    )
  }
  return (
    <>
      {showCongratulations ? (
        <Congratulations />
      ) : (
        <section className="max-w-2xl">
          <h1 className="text-black mb-2.5 text-lg">
            Ajude-nos a melhorar com o seu{' '}
            <span className="text-darkRed font-bold">Feedback!</span>
          </h1>
          <p className="font-medium text-base text-center mb-8">
            Estamos orgulhosos por você chegar até aqui, e precisamos saber o
            que você achou do curso para ajudar a melhorar a qualidade das
            nossas aulas e consequentemente a qualidade do aprendizado de nossos
            alunos.
          </p>
          <div className="h-0.5 bg-darkRed mx-auto w-11/12 mb-5"></div>
          <div className="w-full">
            <p className="font-medium text-xs text-center mb-5">
              Em uma escala de 0 a 10, quanto você indicaria este curso para
              alguém?
            </p>
            <form className="flex items-center justify-center gap-6">
              <label
                className="flex flex-col w-4 items-center gap-1.5"
                htmlFor="0"
              >
                0
                <input type="radio" id="0" name="feedback" value="0" />
              </label>
              <label
                className="flex flex-col w-4 items-center gap-1.5"
                htmlFor="1"
              >
                1
                <input type="radio" id="1" name="feedback" value="1" />
              </label>
              <label
                className="flex flex-col w-4 items-center gap-1.5"
                htmlFor="2"
              >
                2
                <input type="radio" id="2" name="feedback" value="2" />
              </label>
              <label
                className="flex flex-col w-4 items-center gap-1.5"
                htmlFor="3"
              >
                3
                <input type="radio" id="3" name="feedback" value="3" />
              </label>
              <label
                className="flex flex-col w-4 items-center gap-1.5"
                htmlFor="4"
              >
                4
                <input type="radio" id="4" name="feedback" value="4" />
              </label>
              <label
                className="flex flex-col w-4 items-center gap-1.5"
                htmlFor="5"
              >
                5
                <input type="radio" id="5" name="feedback" value="5" />
              </label>
              <label
                className="flex flex-col w-4 items-center gap-1.5"
                htmlFor="6"
              >
                6
                <input type="radio" id="6" name="feedback" value="6" />
              </label>
              <label
                className="flex flex-col w-4 items-center gap-1.5"
                htmlFor="7"
              >
                7
                <input type="radio" id="7" name="feedback" value="7" />
              </label>
              <label
                className="flex flex-col w-4 items-center gap-1.5"
                htmlFor="8"
              >
                8
                <input type="radio" id="8" name="feedback" value="8" />
              </label>
              <label
                className="flex flex-col w-4 items-center gap-1.5"
                htmlFor="9"
              >
                9
                <input type="radio" id="9" name="feedback" value="9" />
              </label>
              <label
                className="flex flex-col w-4 items-center gap-1.5"
                htmlFor="10"
              >
                10
                <input type="radio" id="10" name="feedback" value="10" />
              </label>
            </form>
          </div>
          <div className="flex flex-col items-center justify-center mt-10 mb-6">
            <p className="text-xs font-medium text-black text-center mb-6">
              O que você mais gostou do curso?
            </p>
            <div className="flex gap-x-12 gap-y-5 max-w-2xl overflow-hidden flex-wrap mx-auto">
              <Button
                variant={'default'}
                className="border-solid border-darkRed border text-darkRed font-medium text-xs py-2 px-4 rounded bg-white"
              >
                Exercícios
              </Button>
              <Button
                variant={'default'}
                className="border-solid border-darkRed border text-darkRed font-medium text-xs py-2 px-4 rounded bg-white"
              >
                Didática
              </Button>
              <Button
                variant={'default'}
                className="border-solid border-darkRed border text-darkRed font-medium text-xs py-2 px-4 rounded bg-white"
              >
                Projetos e exemplos
              </Button>
              <Button
                variant={'default'}
                className="border-solid border-darkRed border text-darkRed font-medium text-xs py-2 px-4 rounded bg-white"
              >
                Plataforma
              </Button>
              <Button
                variant={'default'}
                className="border-solid border-darkRed border text-darkRed font-medium text-xs py-2 px-4 rounded bg-white"
              >
                Profudidade do conteúdo
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-center mb-1.5">
            <p className="text-xs text-black font-medium text-center">
              Conte-nos qual foi a sua experiência nesse curso
            </p>
            <textarea
              className="px-1 rounded-sm resize-none border border-slate-300 border-solid bg-white w-full h-20"
              placeholder="Digite aqui sua experiência"
            ></textarea>
            <Button
              onClick={handleClick}
              variant={'default'}
              className="text-white bg-black rounded-sm py-2 px-10 font-medium text-xs self-end mt-3.5"
            >
              Emitir Certificado
            </Button>
          </div>
        </section>
      )}
    </>
  )
}

export default feedback
