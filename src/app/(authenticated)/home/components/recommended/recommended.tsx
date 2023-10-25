'use client'
import { recommendedQueryService } from './services'
import { Card } from '../card'
import { Title } from '../title'
import { useRouter } from 'next/navigation'
interface ListaProps {
  token: string
}

export default function Recommended({ token }: ListaProps) {
  const { data } = recommendedQueryService.useFindAll(token)
  const router = useRouter()
  return (
    <>
      <section>
        <Title title="Recomendados" />
        <div className="flex gap-4 flex-wrap md:flex-nowrap w-full">
          {data?.results[0] && (
            <Card
              className="min-w-[500px]"
              title={data?.results[0]?.titulo?.replace('.mp4', '') || ''}
              description={data?.results[0].descricao}
              url={data?.results[0].curso_read?.capa || ''}
              tag={data?.results[0]?.curso_read?.categoria_read || ''}
              onClick={() =>
                router.push(`/courses/${data?.results[0]?.curso_read?.id}`)
              }
            />
          )}
          <div className="flex flex-col w-full gap-4">
            {data?.results[1] && (
              <Card
                title={data?.results[1]?.titulo?.replace('.mp4', '') || ''}
                description={data?.results[1].descricao}
                url={data?.results[1].curso_read?.capa || ''}
                tag={data?.results[1]?.curso_read?.categoria_read || ''}
                onClick={() =>
                  router.push(`/courses/${data?.results[1]?.curso_read?.id}`)
                }
              />
            )}
            {data?.results[2] && (
              <Card
                title={data?.results[2]?.titulo?.replace('.mp4', '') || ''}
                description={data?.results[2].descricao}
                url={data?.results[2].curso_read?.capa || ''}
                tag={data?.results[2]?.curso_read?.categoria_read || ''}
                onClick={() =>
                  router.push(`/courses/${data?.results[2]?.curso_read?.id}`)
                }
              />
            )}
          </div>
        </div>
      </section>
      <section>
        <Title title="Mais vistos" />
        <div className="flex gap-4 flex-wrap md:flex-nowrap">
          {data?.results.map((item, index) => {
            if (index > 2) return <></>
            return (
              <Card
                className="h-[270px] min-w-[330px]"
                key={item.id}
                title={item?.titulo?.replace('.mp4', '') || ''}
                description={item.descricao}
                url={item.curso_read?.capa || ''}
                tag={item?.curso_read?.categoria_read || ''}
                onClick={() => router.push(`/courses/${item?.curso_read?.id}`)}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}
