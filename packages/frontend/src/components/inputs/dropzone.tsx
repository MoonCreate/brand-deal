import { LucideCloudUpload } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/hooks/use-debounce'

export function DropZone(props: {
  wrapperClassName?: string
  onDrop?: (acceptedFiles: FileList | null) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [_isOnDrag, setIsOnDrag] = useState(false)
  const [files, setFiles] = useState<FileList | null>(null)
  const rect = useRef<DOMRect>(null)
  const isOnDrag = useDebounce(_isOnDrag, { delay: 50 })


  useEffect(() => {
    console.log(isOnDrag)
  }, [isOnDrag])
  // eslint-disable-next-line no-shadow
  const handleOnDrop: typeof props.onDrop = (files) => {
    if (files && files.length > 1) {
      return toast.error("You can't upload more than one file")
    }
    if (files) {
      for (const file of files) {
        if (!file.type.includes('image/')) {
          return toast.error('You can only upload images')
        }
      }
    }
    props.onDrop?.(files)
    setFiles(files)
  }

  useEffect(() => {
    rect.current = ref.current?.getBoundingClientRect() ?? null
  }, [])

  return (
    <div
      ref={ref}
      onDragOver={(e) => {
        e.preventDefault()
        setIsOnDrag(true)
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        setIsOnDrag(false)
      }}
      onDrop={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsOnDrag(false)
        handleOnDrop(e.dataTransfer.files)
      }}
      className={cn(
        'bg-blacked rounded-xl w-100 h-full text-white font-roboto flex justify-center items-center flex-col relative',
        props.wrapperClassName,
      )}
    >
      {files && files.length > 0 ? (
        <img
          src={URL.createObjectURL(files[0])}
          alt={files[0].name}
          className="object-cover rounded-xl shadow-box"
          style={{
            width: rect.current?.width,
            height: rect.current?.height,
          }}
        />
      ) : (
        <motion.div
          className={cn(isOnDrag && 'text-primary')}
          initial={{ scale: 0, y: 100 }}
          animate={{
            scale: isOnDrag ? 1.1 : 1,
            y: 0,
          }}
          exit={{ scale: 0, y: -100 }}
        >
          <LucideCloudUpload className="size-30" />
          <p className="text-center">Drag your file here</p>
        </motion.div>
      )}
    </div>
  )
}
