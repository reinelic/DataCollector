'use client'

import { useEffect, useState } from 'react'

export default function Prompt() {
  const [id, setId] = useState<Number>(2)
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
    if (id < 3) {
      let newId = id + 1
      setId(newId)
    }
  }

  return (
    <>
      <div> Please read the prompt below </div>
      <div>{prompt}</div>
      <span onClick={handleSkip}> Skip </span>
    </>
  )
}
