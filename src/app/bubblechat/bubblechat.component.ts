import {Component, OnInit} from '@angular/core';
import {SpeechRecognitionService} from "../services/speech-recognition.service";
import {ChatbotService} from "../services/chatbot.service";

@Component({
  selector: 'app-bubblechat',
  templateUrl: './bubblechat.component.html',
  styleUrls: ['./bubblechat.component.css']
})
export class BubblechatComponent implements OnInit {
  isChatVisible: boolean = false;
  userInput: string = '';
  messages: { user?: string; bot?: string; time: string; audioUrl?: string }[] = [];
  isRecording: boolean = false;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  constructor(private speechRecognitionService: SpeechRecognitionService, private chatbotService: ChatbotService) {}

  ngOnInit(): void {
    this.speechRecognitionService.recognizedText.subscribe((text) => {
      this.userInput = text;
      this.stopRecordingAndSend();
    });
  }

  toggleChat(): void {
    this.isChatVisible = !this.isChatVisible;
  }

  sendMessage(): void {
    if (this.userInput.trim()) {
      const time = new Date().toLocaleTimeString();
      this.messages.push({ user: this.userInput, time });

      // Call chatbot API
      this.chatbotService.sendMessage(this.userInput).subscribe(response => {
        if (response && response.response) {
          this.messages.push({ bot: response.response, time });
        }
      });

      this.userInput = '';
    }
  }

  async toggleVoiceRecording(): Promise<void> {
    if (this.isRecording) {
      this.stopRecordingAndSend();
    } else {
      await this.startRecording();
    }
  }

  private async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];
      this.isRecording = true;

      this.speechRecognitionService.startListening();

      this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.start();
    } catch (error) {
      console.error('Error accessing microphone', error);
    }
  }

  private stopRecordingAndSend() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
      this.speechRecognitionService.stopListening();
      this.isRecording = false;

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const time = new Date().toLocaleTimeString();

        this.messages.push({ user: 'Voice Message', time, audioUrl });
        this.userInput = '';
      };
    }
  }

}
