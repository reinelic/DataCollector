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
    <>
      <Card className='mt-2 h-full w-full bg-slate-100'>
        <CardHeader>
          <CardDescription> the prompt will last 2 sec </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{prompt}</p>
        </CardContent>
      </Card>
      <span onClick={handleSkip}> Skip </span>
    </>
  )
}
