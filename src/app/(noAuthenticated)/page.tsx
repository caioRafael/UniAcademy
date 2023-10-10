import { FormContent } from './components/FormContent'

export default async function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-between w-full h-full bg-background ">
      <h1 className="font-polarisFuturistic text-lg mt-32">
        uni<span className="text-secondary">academy</span>
      </h1>
      <div className="w-[55%] flex flex-col items-center justify-center gap-4">
        <FormContent />
      </div>

      <p className="text-xxs font-normal text-gray-500 mb-10">
        Universidade Federal Rural do Semiárido - UFERSA
      </p>
    </div>
  )
}
