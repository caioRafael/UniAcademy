import { CalendarCheck, CheckCircle2, LineChart } from 'lucide-react'

export function UserStatus() {
  return (
    <div className="flex flex-col items-baseline h-full gap-5">
      <h1 className="border-l-4 border-secondary pl-1 font-semibold text-xs">
        Status na plataforma
      </h1>

      <div className="flex flex-col gap-5">
        <div className="flex gap-4">
          <div className="flex gap-3 items-center">
            <div className="bg-gray-700 w-9 h-9 rounded-full text-green-400 flex items-center justify-center">
              <CheckCircle2 />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xxs font-semibold">Finalizados</h1>
              <h1 className="text-2xl font-semibold">06</h1>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="bg-gray-700 w-9 h-9 rounded-full text-white flex items-center justify-center">
              <CalendarCheck />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xxs font-semibold">Finalizados</h1>
              <h1 className="text-2xl font-semibold">06</h1>
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="bg-gray-700 w-9 h-9 rounded-full text-yellow-300 flex items-center justify-center">
            <LineChart />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xxs font-semibold">Finalizados</h1>
            <h1 className="text-2xl font-semibold">06</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
