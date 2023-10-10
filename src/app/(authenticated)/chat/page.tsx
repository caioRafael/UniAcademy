'use client'

import { Fragment } from 'react'
import { ChevronLeft, Inbox, MoreVertical, Navigation } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Figure } from './components/figure'
import { TextAreaAutoSize } from './components/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Message } from './components/message'

export default function ChatPage() {
  return (
    <div className="pt-4 pb-0 w-full max-h-full grid grid-rows-[58px_1fr] overflow-y-hidden">
      <header className="pl-6">
        <div className="flex gap-4 mb-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Chat</h1>
        </div>
        <Separator />
      </header>

      <div className="grid grid-cols-[300px_1fr] overflow-hidden">
        <ScrollArea>
          <ul className="p-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <Fragment key={index}>
                <li>
                  <Figure
                    name="Professor Angelo Morais"
                    on={index % 2 === 0}
                    avatar={{ src: 'https://github.com/shadcn.png' }}
                    count={index}
                  />
                </li>
                <Separator className="my-4" />
              </Fragment>
            ))}
          </ul>
        </ScrollArea>

        <div className="flex h-full overflow-y-hidden">
          <Separator orientation="vertical" />

          <div className="border m-4 rounded-md w-full flex flex-col">
            <header className="p-4 pb-0 z-10">
              <div className="flex w-full justify-between items-center">
                <Figure
                  name="Professor Angelo"
                  on
                  avatar={{ src: 'https://github.com/shadcn.png' }}
                />
                <Button variant="outline" size="icon" className="active:red">
                  <MoreVertical />
                </Button>
              </div>
              <Separator className="mt-4" />
            </header>

            <ScrollArea className="flex-1">
              <div className="py-4 flex flex-col gap-4">
                <Message
                  body={'Olá, como vão os estudos?'}
                  time="10:40 AM, Terça-feira"
                  sender={false}
                />

                <Message
                  body={
                    'Podemos marcar uma monitoria? estou com alguma dúvidas.'
                  }
                  time="13:40 PM, Quarta-feira"
                />

                <Message time="13:40 PM, Quarta-feira">
                  <Image
                    src="https://github.com/shadcn.png"
                    width={100}
                    height={100}
                    alt="Imagem"
                  />
                  <Image
                    src="https://github.com/shadcn.png"
                    width={100}
                    height={100}
                    alt="Imagem"
                  />
                  <Image
                    src="https://github.com/shadcn.png"
                    width={100}
                    height={100}
                    alt="Imagem"
                  />
                </Message>

                <Message
                  body={'Olá, como vão os estudos?'}
                  time="10:40 AM, Terça-feira"
                  sender={false}
                />
              </div>
            </ScrollArea>

            <footer className="bg-[#0A394726] relative bottom-0 w-full p-2 flex gap-2 items-center z-10">
              <Button
                variant="outline"
                size="icon"
                className="border-none bg-transparent hover:bg-gray-400"
              >
                <Inbox />
              </Button>
              <section className="flex items-center w-[100%]">
                <TextAreaAutoSize
                  name="message"
                  placeholder="Digite a sua mensagem"
                  className="min-h-[10px] border-none focus-visible:ring-none outline-none rounded-md h-auto resize-none bg-[#83838347] placeholder:text-[#00000059] text-[.87rem]"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="border-none bg-transparent hover:bg-transparent"
                >
                  <Navigation />
                </Button>
              </section>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}
