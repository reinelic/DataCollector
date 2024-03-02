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
    localStorage.setItem('dataKey', 'onboarded')
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
    <div className='relative flex  min-h-96 flex-col items-center py-32 text-center'>
      <div className=' flex w-full flex-grow flex-col items-center justify-center gap-12'>
        <Prompt />
      </div>

      <div className='h-full w-1/5 py-12 text-end lg:absolute lg:right-0 lg:top-0'>
        <div className=''>
          <div className='flex flex-col gap-2'>
            {audios.length > 0 &&
              audios.map((audio, index) => (
                <div
                  className='w-full rounded-2xl bg-slate-50 p-2 '
                  onClick={() => {
                    handlePlay(index)
                  }}
                  key={index}
                >
                  `audio ${index}`
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className=' absolute bottom-0 right-0'>
        <button className={buttonVariants()} disabled={!(audios.length > 4)}>
          Submit your recording
        </button>
      </div>
      <div className='absolute bottom-0 mx-auto'>
        <div className='flex-grow'>
          {isRecording ? (
            <div className='flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 hover:bg-slate-200 '>
              <button type='button' onClick={handleStop}>
                {' '}
                <StopCircle size={32} color='#ed6f55' />
              </button>
            </div>
          ) : (
            <div className='flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 hover:bg-slate-200 '>
              <button type='button' onClick={handleStart}>
                <Mic size={32} color='#ed6f55' />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AudioRecorder
