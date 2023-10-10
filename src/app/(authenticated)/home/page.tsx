import { Card } from './components/card'
import { Title } from './components/title'

export default function Home() {
  return (
    <div className="flex flex-col px-4 py-6 gap-8">
      <section>
        <Title title="Recomendados" />
        <div className="flex gap-4 flex-wrap md:flex-nowrap w-full">
          <Card
            title="Estrutura de dados"
            description="Aprenda estruturas de dados com a linguagem JavaScript e se destaque no mercado de trabalho."
            url="https://i.ibb.co/jGQ7qMy/curso.png"
            tag="Programação"
          />
          <div className="flex flex-col gap-4">
            <Card
              title="Figma"
              description="Aprenda estruturas de dados com a linguagem JavaScript e se destaque no mercado de trabalho."
              url="https://i.ibb.co/ry8yS7W/curso-2.png"
              tag="UX/UI design"
            />
            <Card
              title="Estrutura de dados"
              description="Aprenda estruturas de dados com a linguagem JavaScript e se destaque no mercado de trabalho."
              url="https://i.ibb.co/jGQ7qMy/curso.png"
              tag="Programação"
            />
          </div>
        </div>
      </section>

      <section>
        <Title title="Mais vistos" />
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
      </section>
    </div>
  )
}
