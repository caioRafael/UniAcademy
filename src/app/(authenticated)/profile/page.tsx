import { CoursesContainer } from './components/CoursesContainer'

import { ScrollArea } from '@/components/ui/scroll-area'
import { CertificateCard } from './components/CertificateCard'
import { getUser } from '@/lib/auth'
import Profile from '@/types/Profile'

export default async function Profile() {
  const { id, token, profile } = await getUser()
  return (
    <div className="w-full h-full flex flex-col px-6 pt-14 gap-4 mb-6">
      <div className="grid grid-cols-[1fr_40%] gap-4">
        <div className="flex flex-col h-[400px] gap-6">
          <h1 className="border-l-4 border-secondary pl-1 font-semibold text-xs">
            Meus cursos
          </h1>
          <CoursesContainer
            userId={id}
            token={token}
            profile={profile as Profile}
          />
          {/* <Tabs defaultValue="inProgress">
            <TabsList className="mb-7">
              <TabsTrigger value="inProgress">Em progresso</TabsTrigger>
              <TabsTrigger value="concluded">Concluido</TabsTrigger>
            </TabsList>
            <TabsContent value="inProgress">
              <CoursesContainer
                userId={id}
                token={token}
                profile={profile as Profile}
              />
            </TabsContent>
            <TabsContent value="concluded">
              <h1>concluido</h1>
            </TabsContent>
          </Tabs> */}
        </div>
        <div className="flex flex-col h-[400px] gap-6">
          <h1 className="border-l-4 border-secondary pl-1 font-semibold text-xs">
            Cerificados
          </h1>
          <div className="flex w-full h-full border border-border bg-white p-3 rounded-lg">
            <ScrollArea className="flex flex-col w-full gap-2">
              <CertificateCard />
              <CertificateCard />
              <CertificateCard />
              <CertificateCard />
              <CertificateCard />
              <CertificateCard />
              <CertificateCard />
              <CertificateCard />
              <CertificateCard />
              <CertificateCard />
              <CertificateCard />
              <CertificateCard />
              <CertificateCard />
              <CertificateCard />
              <CertificateCard />
              <CertificateCard />
              <CertificateCard />
              <CertificateCard />
              <CertificateCard />
            </ScrollArea>
          </div>
        </div>
      </div>
      {/* <section className="mt-4">
        <Title title="Materiais produzidos" />
        <div className="flex gap-4 flex-wrap md:flex-nowrap">
          <Card
            title="Estrutura de dados"
            description="Aprenda estruturas de dados com a linguagem JavaScript e se destaque no mercado de trabalho."
            url="https://i.ibb.co/jGQ7qMy/curso.png"
            tag="Programação"
          />
          <Card
            title="Estrutura de dados"
            description="Aprenda estruturas de dados com a linguagem JavaScript e se destaque no mercado de trabalho."
            url="https://i.ibb.co/jGQ7qMy/curso.png"
            tag="Programação"
          />
          <Card
            title="Estrutura de dados"
            description="Aprenda estruturas de dados com a linguagem JavaScript e se destaque no mercado de trabalho."
            url="https://i.ibb.co/jGQ7qMy/curso.png"
            tag="Programação"
          />
        </div>
      </section> */}
    </div>
  )
}
