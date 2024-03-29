'use client'
import { buttonVariants } from '@/components/ui/button'
import { Button } from './ui/button'
import { Mic, StopCircle, Play, Pause } from 'lucide-react'
import { useState, useEffect } from 'react'
import Prompt from './Prompt'
import OnboardingForm from './OnboardingForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Link from 'next/link'

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
  const [onBoard, setOnboard] = useState<boolean>(true)

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

    const storedName = localStorage.getItem('onboarded')
    if (storedName) {
      setOnboard(true)
    } else {
      setOnboard(false)
    }
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

  const handlePause = (index: any) => {
    let audio = audios[index]
    audio.pause()
  }

  function onSubmit() {
    console.log('clicked')
    localStorage.setItem('onboarded', 'true')
    setOnboard(true)
  }

  return (
    <>
      {!onBoard && (
        <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-75 '>
          <OnboardingForm close={onSubmit} />
        </div>
      )}
      <div className='bg-slate-300s relative z-0  flex min-h-96 flex-col items-center py-24 text-center'>
        <div className='flex flex-row gap-1 py-4 text-sm text-slate-700 '>
          Please click on the icon <Mic /> to start recording
        </div>
        {isRecording && (
          <>
            <span> Recording </span>
            <div className='mx-2 mb-3 h-4 w-4 animate-pulse rounded-full bg-red-400'></div>
          </>
        )}
        <div className=' flex w-full flex-grow flex-col items-center justify-center gap-12'>
          <Prompt skip={isRecording} />
        </div>

        <div className=' w-1/5 py-24 text-center lg:absolute lg:right-0 lg:top-0 lg:z-0'>
          <div className=''>
            <div className='flex flex-col gap-2'>
              {audios.length > 0 &&
                audios.map((audio, index) => (
                  <div
                    className='flex w-full flex-row items-center gap-1 rounded-2xl bg-slate-50 p-2'
                    key={index}
                  >
                    Recording {index + 1} :
                    <button
                      onClick={() => {
                        handlePlay(index)
                      }}
                    >
                      {' '}
                      <Play color='gray' />
                    </button>
                    <button
                      onClick={() => {
                        handlePause(index)
                      }}
                    >
                      {' '}
                      <Pause color='gray' />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className=' absolute bottom-10 right-0'>
          <button
            className={
              audios.length > 4 ? 'cursor-pointer' : 'cursor-not-allowed'
            }
            disabled={!(audios.length > 4)}
          >
            <Button
              variant='ghost'
              size='sm'
              disabled={audios.length > 5}
              className={
                audios.length > 5 ? 'cursor-not-allowed' : 'cursor-pointer'
              }
            >
              <Link href='/thank'>Submit your recording </Link>
            </Button>
          </button>
        </div>

        <div className='absolute bottom-0 mx-auto'>
          <div className='flex-grow'>
            {audios.length < 5 ? (
              isRecording ? (
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
              )
            ) : (
              <div>You can now submit your recordings</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AudioRecorder
