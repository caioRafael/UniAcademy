import { Github, Instagram, Linkedin } from 'lucide-react'

export function UserSocialMedia() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="border-l-4 border-secondary pl-1 font-semibold text-xs">
        Minhas redes
      </h1>

      <div className="h-10 flex gap-3">
        <div className="bg-gray-700 w-9 h-9 rounded-full text-white flex items-center justify-center">
          <Instagram />
        </div>

        <div className="bg-gray-700 w-9 h-9 rounded-full text-white flex items-center justify-center">
          <Linkedin />
        </div>

        <div className="bg-gray-700 w-9 h-9 rounded-full text-white flex items-center justify-center">
          <Github />
        </div>
      </div>

      {/* <h1 className="border-l-4 border-secondary pl-1 font-semibold text-xs">
        Seja monitor
      </h1>
      <Button className="border-secondary bg-transparent border-2 text-secondary w-36">
        Saiba mais
      </Button> */}
    </div>
  )
}
