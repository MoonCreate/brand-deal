import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/campaign/create')({
  component: RouteComponent,
  beforeLoad: ({ context: { queryClient }}) => {
    const data = queryClient.getQueryData(['profile']);
    console.log(data);
  }
})

function RouteComponent() {
  return <div>Hello "/campaign/create"!</div>
}
