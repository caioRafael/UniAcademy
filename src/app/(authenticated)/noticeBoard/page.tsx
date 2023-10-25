import { getUser } from '@/lib/auth'
import { NoticeBoardContainer } from './components/NoticeBoardContainer'
import { CreateWarningModal } from './components/CreateWarningModal'
import { Title } from '@/components/Title'

async function NoticeBoard() {
  const { token, id } = await getUser()
  return (
    <div className="w-full flex flex-col px-8 pt-16 gap-10">
      <Title title="Mural de Avisos" />
      <div className="flex flex-row items-center justify-end w-full mb-3">
        <CreateWarningModal token={token} userId={id} />
      </div>
      <NoticeBoardContainer token={token} />
    </div>
  )
}

export default NoticeBoard
