'use client'

import { ChangeEvent, useMemo, useState } from 'react'
import { Spin } from '../spin'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import Profile from '@/types/Profile'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Edit, Settings } from 'lucide-react'
import { profileQueryService } from '@/app/(authenticated)/services'

interface UpdateProfileModalProps {
  profile: Profile
  token: string
}

export function UpdateProfileModal(props: UpdateProfileModalProps) {
  const { profile, token } = props
  const { mutateAsync, isLoading } = profileQueryService.useUpdate(token)
  const [nomeCompleto, setNomeCompleto] = useState<string>(
    profile.nome_completo,
  )
  const [foto, setFoto] = useState<string | File>(profile?.foto as string)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const getLocalURL = (file: File) => {
    const blob = new Blob([file])
    return URL.createObjectURL(blob)
  }

  const fotoUrl = useMemo(() => {
    if (typeof foto === 'string') {
      return foto
    } else {
      const url = getLocalURL(foto)
      return url
    }
  }, [foto])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFoto(file)
    }
  }

  const handleUpdateProfile = async () => {
    const data = {
      ...profile,
      foto: foto as File,
      nome_completo: nomeCompleto,
    } as Profile

    const result = await mutateAsync(data)

    if (result) setOpenModal(false)
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger>
        <Button variant={'ghost'}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50%]">
        <DialogTitle>Atualize seu perfil</DialogTitle>
        <div className="flex w-full gap-4 pb-10 items-center">
          {foto && fotoUrl && (
            <Avatar className="w-14 h-14">
              <AvatarImage src={fotoUrl as string} />
              <AvatarFallback className="text-secondary">
                {nomeCompleto.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
          <>
            <input
              type="file"
              id="image"
              className="sr-only"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image"
              className="border-2 w-14 h-14 flex text-xs rounded-full aspect-video items-center justify-center cursor-pointer border-dashed gap-2 text-muted-foreground hover:bg-primary/5"
            >
              <Edit />
            </label>
          </>
          <div className="w-full">
            <Label className="font-medium text-xs">Nome completo</Label>
            <Input
              placeholder="Nome completo"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.currentTarget.value)}
            />
          </div>

          <Button
            type="button"
            onClick={handleUpdateProfile}
            className="w-32 self-end"
          >
            {isLoading ? <Spin /> : 'Atualizar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
