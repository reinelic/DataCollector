'use client'

import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
ChevronRight

export default function Prompt() {
  const [id, setId] = useState<any>(1)
  const [prompt, setPromt] = useState<String>('')

  const getPrompts = async () => {
    let prompts = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    )
    const data = await prompts.json()

    setPromt(data.title)

    console.log(data)
  }

  useEffect(() => {
    getPrompts()
  }, [id])

  const handleSkip = () => {
    if (parseInt(id) < 3) {
      let newId = id + 1
      setId(newId)
    }
  }

  return (
    <div className=' h-1/2 w-1/2  gap-5'>
      <Card className=''>
        <CardHeader>
          <CardDescription> the prompt will last 2 sec </CardDescription>
        </CardHeader>
        <CardContent>
          <p className=''>{prompt}</p>
        </CardContent>
      </Card>
      <div
        className='mt-4 flex flex-row items-center justify-end text-sm'
        onClick={handleSkip}
      >
        <div className='flex cursor-pointer  flex-row items-center justify-end rounded-2xl bg-slate-50 px-4 py-1  hover:bg-slate-100'>
          <div className='text-muted text-slate-500'>Skip</div>
          <ChevronRight color='#d9d9d9' />
        </div>
      </div>
    </div>
  )
}
