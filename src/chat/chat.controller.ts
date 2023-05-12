import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { response } from 'express';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Get()
  public getChatInfo() {
    return this.chatService.chatCompletion('What is UX design?', 0, 50)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
        throw new Error(err);
      });
  }

  @Post('speech-recognize')
  public async postSpeechRecognize(@Body() audioFile: File) {
    return this.chatService
      .transcribeAudioIntoText(audioFile)
      .then((response) => response);
  }

  @Get('models')
  public getAvailableModels() {
    return this.chatService.getModels()
      .then((response) => response.data.data);
  }
}
