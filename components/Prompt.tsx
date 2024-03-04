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

export default function Prompt({ skip }: any) {
  const [id, setId] = useState<any>(1)
  const [prompt, setPromt] = useState<String>('')

  const getPrompts = async () => {
    let prompts = await fetch(
      `https://my-json-server.typicode.com/reinelic/promptsDemo/prompts/${id}`
    )
    const data = await prompts.json()

    console.log(data)

    setPromt(data.text)

    console.log(data)
  }

  useEffect(() => {
    getPrompts()
  }, [id])

  const handleSkip = () => {
    if (parseInt(id) < 6) {
      let newId = id + 1
      setId(newId)
    } else {
      setId(1)
    }
  }

  return (
    <div className=' h-1/2 w-1/2  gap-5'>
      <Card className='py-12'>
        <CardHeader></CardHeader>
        <CardContent>
          <div className='text-3xl text-foreground text-slate-500'>
            {' '}
            {prompt}
          </div>
        </CardContent>
      </Card>
      {!skip && (
        <div
          className='mt-4 flex flex-row items-center justify-end text-sm'
          onClick={handleSkip}
        >
          <div className='flex cursor-pointer  flex-row items-center justify-end rounded-2xl bg-slate-50 px-4 py-1  hover:bg-slate-100'>
            <div className='text-muted text-slate-500'>Skip</div>
            <ChevronRight color='#d9d9d9' />
          </div>
        </div>
      )}
    </div>
  )
}
