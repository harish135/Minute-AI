let mediaRecorder = null;
let audioChunks = [];
let timerInterval = null;
let seconds = 0;

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const statusDiv = document.getElementById('status');

function updateTimer() {
  statusDiv.textContent = `Recording... ${seconds}s`;
}

startBtn.addEventListener('click', () => {
  chrome.tabCapture.capture({ audio: true, video: false }, (stream) => {
    if (!stream) {
      statusDiv.textContent = 'Could not capture tab audio.';
      return;
    }
    audioChunks = [];
    seconds = 0;
    updateTimer();
    timerInterval = setInterval(() => {
      seconds++;
      updateTimer();
    }, 1000);
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunks.push(e.data);
        // TODO: send to backend
        console.log('Audio chunk:', e.data);
      }
    };
    mediaRecorder.onstop = () => {
      clearInterval(timerInterval);
      statusDiv.textContent = 'Stopped.';
      console.log('Recording stopped. Total chunks:', audioChunks.length);
      // TODO: send all audioChunks to backend if needed
    };
    mediaRecorder.start(1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
  });
});

stopBtn.addEventListener('click', () => {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    clearInterval(timerInterval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
}); 