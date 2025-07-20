import { useQuery } from '@tanstack/react-query'

export function useGetCreatorList() {
  return useQuery({
    queryKey: ['creator-list'],
    queryFn: () => [
      {
        name: 'John Doe',
        image: 'https://randomuser.me/api/portraits/lego/1.jpg',
        followers: '1.2M',
      },
      {
        name: 'Jane Doe',
        image: 'https://randomuser.me/api/portraits/lego/2.jpg',
        followers: '980K',
      },
      {
        name: 'Alice Smith',
        image: 'https://randomuser.me/api/portraits/lego/3.jpg',
        followers: '3.5M',
      },
      {
        name: 'Bob Johnson',
        image: 'https://randomuser.me/api/portraits/lego/4.jpg',
        followers: '2.1M',
      },
      {
        name: 'Emily Davis',
        image: 'https://randomuser.me/api/portraits/lego/5.jpg',
        followers: '1.8M',
      },
      {
        name: 'Michael Brown',
        image: 'https://randomuser.me/api/portraits/lego/6.jpg',
        followers: '980K',
      },
      {
        name: 'Olivia Wilson',
        image: 'https://randomuser.me/api/portraits/lego/7.jpg',
        followers: '3.5M',
      },
      {
        name: 'William Taylor',
        image: 'https://randomuser.me/api/portraits/lego/8.jpg',
        followers: '2.1M',
      },
      {
        name: 'Sophia Anderson',
        image: 'https://randomuser.me/api/portraits/lego/9.jpg',
        followers: '1.8M',
      },
    ],
  })
}
