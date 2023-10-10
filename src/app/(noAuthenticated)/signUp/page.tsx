import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FormContent } from './components/FormContent'

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center  justify-between w-full h-full bg-background overflow-hidden">
      <h1 className="font-polarisFuturistic text-lg  mt-32">
        uni<span className="text-secondary">academy</span>
      </h1>
      <div className="w-[55%] flex flex-col items-center justify-center gap-4">
        <Tabs defaultValue="teacher" className="w-[400px]">
          <TabsList className="mb-7 ">
            <TabsTrigger value="teacher">Professor</TabsTrigger>
            <TabsTrigger value="student">Aluno</TabsTrigger>
            <TabsTrigger value="visitor">Visitante</TabsTrigger>
          </TabsList>
          <TabsContent value="teacher">
            <FormContent typeProfile="professor" />
          </TabsContent>
          <TabsContent value="visitor">
            <FormContent typeProfile="visitante" />
          </TabsContent>
          <TabsContent value="student">
            <FormContent typeProfile="aluno" />
          </TabsContent>
        </Tabs>
      </div>

      <p className="text-xxs font-normal text-gray-500 mb-10">
        Universidade Federal Rural do Semiárido - UFERSA
      </p>
    </div>
  )
}
