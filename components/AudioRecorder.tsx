'use client'
import { buttonVariants } from '@/components/ui/button'
import { Mic, Ban, StopCircle } from 'lucide-react'

import { useState, useEffect } from 'react'
import Prompt from './Prompt'

// Declare a global interface to add the webkitSpeechRecognition property to the Window object
declare global {
  interface Window {
    MediaRecorder: any
  }
}

let mediarecorder: any = undefined
let stream: any = undefined

const AudioRecorder = () => {
  const [permission, setPermission] = useState<boolean>(false)
  const [audios, setAudio] = useState<any[]>([])
  const [isRecording, setRecording] = useState<boolean>(false)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then((newstream) => {
        stream = newstream
        console.log(stream)
      })
  }, [])

  const handleStart = () => {
    mediarecorder = new window.MediaRecorder(stream)

    const audioChunks: Array<any> = []

    mediarecorder.addEventListener('dataavailable', function (e: any) {
      if (e.data.size > 0) audioChunks.push(e.data)
    })
    mediarecorder.onstop = (e: any) => {
      let blob = new Blob(audioChunks, { type: 'audio/ogg ; codecs=opus' })
      let newAudio = URL.createObjectURL(blob)
      let audio = new Audio(newAudio)
      setAudio([...audios, audio])
    }

    mediarecorder.start()

    setRecording(!isRecording)
  }

  const handleStop = () => {
    if (mediarecorder) mediarecorder.stop()
    setRecording(!isRecording)
  }

  const handlePlay = (index: any) => {
    let audio = audios[index]
    audio.play()
  }

  return (
    <div className='mx-auto flex max-w-3xl flex-col items-center py-20  text-center'>
      <Prompt />

      <p className='mt-6 max-w-prose text-lg text-muted-foreground'>
        {' '}
        Please click on button to start recording
      </p>
      <div className='mt-6 flex flex-col gap-4 sm:flex-row'>
        {isRecording ? (
          <button type='button' onClick={handleStop}>
            {' '}
            <StopCircle />
          </button>
        ) : (
          <button type='button' onClick={handleStart}>
            <Mic />
          </button>
        )}
      </div>

      <div className='mt-3 flex flex-col items-center'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2'>
            {audios.length > 0 &&
              audios.map((audio, index) => (
                <div
                  onClick={() => {
                    handlePlay(index)
                  }}
                  key={index}
                >
                  `audio ${index}`
                </div>
              ))}
          </div>
          <button className={buttonVariants()} disabled={!(audios.length > 4)}>
            Submit your recording
          </button>
        </div>
      </div>
    </div>
  )
}

export default AudioRecorder
