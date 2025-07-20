import { createContext, useContext } from 'react'

export function createInjection<T, TArgs extends Array<unknown>>(
  hook: (...args: TArgs) => T,
) {
  const ctx = createContext<T>(undefined as never)
  return {
    init: hook,
    provider: (props: { value: T; children: React.ReactNode }) => (
      <ctx.Provider value={props.value}>{props.children}</ctx.Provider>
    ),
    use: (): T => {
      const c = useContext(ctx)
      if (!c) throw new Error(`No '${hook.name}' Provider Found`)
      return c
    },
  }
}
