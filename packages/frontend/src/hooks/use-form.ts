import { useEffect, useRef, useState } from 'react'

type SupportedFields = string | File | number

export function useForm<T extends Record<string, SupportedFields>>(props?: {
  defaultValue?: Partial<T>
}) {
  const value = useRef<T>({} as T)

  const watchList = useRef<
    Record<keyof T, Array<(value: T[keyof T]) => unknown>>
  >({} as never)

  const getOnChangeListener = (
    type: React.ComponentProps<'input'>['type'],
    k: keyof T,
  ): ((e: React.ChangeEvent<HTMLInputElement>) => unknown) => {
    switch (type) {
      case 'file':
        return (e) => (value.current[k] = e.target.files as never)
      case 'number':
        return (e) => (value.current[k] = +e.target.value as never)
      default:
        return (e) => (value.current[k] = e.target.value as never)
    }
  }

  const createHandle = <const TKey extends keyof T>(
    k: TKey,
    type: React.ComponentProps<'input'>['type'] = 'text',
  ) => {
    const listener = getOnChangeListener(type, k)
    return {
      name: k,
      defaultValue: props?.defaultValue?.[k] as string,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const result = listener(e)
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        watchList.current[k]?.forEach((cb) => cb(value.current[k]))
        return result
      },
      type,
    } as const
  }

  const getValue = () => value.current
  const setValue = <const TKey extends keyof T>(key: TKey, val: T[TKey]) => {
    value.current[key] = val
  }

  const watchValue = <const TKey extends keyof T>(key: TKey) => {
    const [v, setV] = useState(value.current[key])

    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      const list = (watchList.current[key] ??= [])
      list.push(setV as never)

      return () => {
        list.splice(list.indexOf(setV as never), 1)
      }
    }, [])

    return v
  }

  return { createHandle, getValue, setValue, watchValue }
}
