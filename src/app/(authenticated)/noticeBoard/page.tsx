import { getUser } from '@/lib/auth'
import { NoticeBoardContainer } from './components/NoticeBoardContainer'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CreateWarningModal } from './components/CreateWarningModal'
import { Title } from '@/components/Title'

async function NoticeBoard() {
  const { token, id } = await getUser()
  return (
    <div className="w-full flex flex-col px-8 pt-16 gap-10">
      <Title title="Mural de Avisos" />
      <div className="flex flex-row items-center justify-between w-full mb-3">
        <div className="w-1/2 flex gap-1">
          <Input
            // className="max-w-[250px]"
            placeholder="O que você procura?"
            // onChange={(e) => setQuery(e.target.value)}
          />
          <Button>Buscar</Button>
        </div>
        <CreateWarningModal token={token} userId={id} />
      </div>
      <NoticeBoardContainer token={token} />
    </div>
  )
}

export default NoticeBoard
