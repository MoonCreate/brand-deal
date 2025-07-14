import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import { useGetBrands } from '@/hooks/use-get-brand'
import { useGetCampaigns } from '@/hooks/use-get-campaign'
import { useGetCreators } from '@/hooks/use-get-creator'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const queryBrands = useGetBrands()
  const queryCreators = useGetCreators()
  const queryCampaigns = useGetCampaigns()

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
      </header>
    </div>
  )
}
