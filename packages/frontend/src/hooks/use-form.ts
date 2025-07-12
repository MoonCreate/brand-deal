import { useRef } from 'react'

type SupportedFields = string | File | number

export function useForm<T extends Record<string, SupportedFields>>(props?: {
  defaultValue?: Partial<T>
}) {
  const value = useRef<T>({} as T)

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
  ) =>
    ({
      name: k,
      defaultValue: props?.defaultValue?.[k] as string,
      onChange: getOnChangeListener(type, k),
      type,
    }) as const

  const getValue = () => value.current
  const setValue = <const TKey extends keyof T>(key: TKey, val: T[TKey]) => {
    value.current[key] = val
  }

  return { createHandle, getValue, setValue }
}
