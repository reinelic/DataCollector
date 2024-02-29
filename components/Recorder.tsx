'use client'

import { use, useState } from 'react'
import { buttonVariants } from '@/components/ui/button'

const Recorder = () => {
  const [permission, setPermission] = useState<boolean>(false)
  const [audios, setAudio] = useState<any[]>([])
  const [isRecording, setRecording] = useState<boolean>(false)

  //   setAudio([...audios, audio])

  return (
    <div>
      <div className='mt-3 flex flex-row items-center'>
        {isRecording && <p> you are recording ...</p>}
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2'>
            {audios.length > 0 &&
              audios.map((audio, index) => (
                <audio controls='true' src={audio} type='audio.ogg' key={index}>
                  {' '}
                </audio>
              ))}
          </div>
          <button className={buttonVariants()}>Submit your recording</button>
        </div>
      </div>
    </div>
  )
}

export default Recorder
