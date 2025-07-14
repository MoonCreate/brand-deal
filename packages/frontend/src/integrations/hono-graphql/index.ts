export async function graphql(query: string) {
  return fetch('http://192.168.101.18:42069/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json())
}