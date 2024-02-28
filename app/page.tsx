'use client'

import { useState, useRef } from 'react'

// Declare a global interface to add the webkitSpeechRecognition property to the Window object
declare global {
  interface Window {
    MediaRecorder: any
  }
}

export default function Home() {
  const [permission, setPermission] = useState<boolean>(false)
  const [audios, setAudio] = useState<any[]>([])
  const [isRecording, setRecording] = useState<boolean>(false)

  let mediarecorder: any = undefined
  let stream = undefined

  const getMicrophonePermission = async () => {
    if ('MediaRecorder' in window) {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        })
      } catch (err) {
        alert(err.message)
      }
    } else {
      alert('The MediaRecorder API is not supported in your browser.')
    }
  }

  const handleStart = async () => {
    await getMicrophonePermission()

    setRecording(!isRecording)

    mediarecorder = new window.MediaRecorder(stream)

    const audioChunks = []

    mediarecorder.addEventListener('dataavailable', function (e: any) {
      console.log('I am recording ..')
      if (e.data.size > 0) audioChunks.push(e.data)
    })
    mediarecorder.onstop = (e) => {
      let blob = new Blob(audioChunks, { type: 'audio/ogg ; codecs=opus' })
      let newAudio = URL.createObjectURL(blob)
      setAudio([...audios, newAudio])
    }

    mediarecorder.start()
  }

  const handleStop = () => {
    if (mediarecorder) mediarecorder.stop()
  }

  return (
    <div>
      <h2>Audio Recorder</h2>
      <main>
        <div className='audio-controls'>
          <button type='button' onClick={handleStop}>
            Stop
          </button>

          <button type='button' onClick={handleStart}>
            Record
          </button>

          {isRecording && <p> you are recording ...</p>}

          {audios.length > 0 ? (
            audios.map((audio, index) => (
              <audio controls='true' src={audio} type='audio.ogg'>
                {' '}
              </audio>
            ))
          ) : (
            <div>No audio yet </div>
          )}
        </div>
      </main>
    </div>
  )
}
