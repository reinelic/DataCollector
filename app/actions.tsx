'use server'

// Declare a global interface to add the webkitSpeechRecognition property to the Window object
// declare global {
//   interface Window {
//     MediaRecorder: any
//   }
// }

async function getMicrophonePermission() {
  let stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  })

  return stream
}

export default getMicrophonePermission
