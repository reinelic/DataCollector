'use client'
import { buttonVariants } from '@/components/ui/button'
import { useState, useEffect } from 'react'

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
      console.log('I am recording ..')
      if (e.data.size > 0) audioChunks.push(e.data)
    })
    mediarecorder.onstop = (e: any) => {
      let blob = new Blob(audioChunks, { type: 'audio/ogg ; codecs=opus' })
      let newAudio = URL.createObjectURL(blob)
      setAudio([...audios, newAudio])
    }

    mediarecorder.start()

    setRecording(!isRecording)
  }

  const handleStop = () => {
    if (mediarecorder) mediarecorder.stop()
  }

  return (
    <div className='mx-auto flex max-w-3xl flex-col items-center py-20  text-center'>
      <h3 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
        Demo <span className='text-blue-600'> Data Collector</span>.
      </h3>

      <p className='mt-6 max-w-prose text-lg text-muted-foreground'>
        {' '}
        Please click on button to start recording
      </p>

      <div className='mt-6 flex flex-col gap-4 sm:flex-row'>
        <button type='button' onClick={handleStop}>
          Stop
        </button>

        <button type='button' onClick={handleStart}>
          Record
        </button>
      </div>

      <div className='mt-3 flex flex-row items-center'>
        {isRecording && <p> you are recording ...</p>}
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2'>
            {audios.length > 0 &&
              audios.map((audio, index) => (
                <audio src={audio} type='audio.ogg' key={index}>
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

export default AudioRecorder
