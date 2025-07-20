import { useQuery } from '@tanstack/react-query'

// TODO: replace with real data
export function useGetBrandList() {
  return useQuery({
    queryKey: ['brand-list'],
    queryFn: () => {
      return [
        {
          name: 'Nike',
          image:
            'https://media.about.nike.com/img/cf68f541-fc92-4373-91cb-086ae0fe2f88/002-nike-logos-swoosh-white.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjowLCJ0b3AiOjAsIndpZHRoIjo1MDAwLCJoZWlnaHQiOjI4MTN9LCJyZXNpemUiOnsid2lkdGgiOjE5MjB9fX0%3D&s=aa2b1811d4e185eaa5538fac73fcfc1db9f4823d3ba2a146a188c7cef1bd96ee',
          followers: '1.2M',
        },
        {
          name: 'Adidas',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1088px-Adidas_Logo.svg.png',
          followers: '980K',
        },
        {
          name: 'Apple',
          image:
            'https://i.pinimg.com/736x/53/30/4c/53304cec35916f3b459554bccc64ad27.jpg',
          followers: '3.5M',
        },
        {
          name: 'Samsung',
          image:
            'https://cdn.logojoy.com/wp-content/uploads/20240909124958/Samsung-logo-2008-600x319.png',
          followers: '2.1M',
        },
        {
          name: 'Coca-Cola',
          image:
            'https://thumbs.dreamstime.com/b/coca-cola-logo-red-background-vector-73936632.jpg',
          followers: '1.8M',
        },
        {
          name: 'Google',
          image:
            'https://mir-s3-cdn-cf.behance.net/project_modules/hd/fd66d964270069.5accdab569ed3.jpg',
          followers: '4.3M',
        },
        {
          name: 'Microsoft',
          image:
            'https://cdn.pixabay.com/photo/2013/02/12/09/07/microsoft-80658_1280.png',
          followers: '2.7M',
        },
        {
          name: 'Amazon',
          image:
            'https://static.vecteezy.com/system/resources/previews/014/018/563/non_2x/amazon-logo-on-transparent-background-free-vector.jpg',
          followers: '3.1M',
        },
        {
          name: 'Tesla',
          image:
            'https://graphicsprings.com/wp-content/uploads/2023/07/image-173.png',
          followers: '2.9M',
        },
        {
          name: 'Netflix',
          image:
            'https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940',
          followers: '1.6M',
        },
      ]
    },
  })
}
