import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Get()
  public getChatInfo() {
    return this.chatService
      .chatCompletion('What is UX design?', 0, 50)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
        throw new Error(err);
      });
  }

  @Post('speech-recognize')
  @UseInterceptors(FileInterceptor('audioFile'))
  public async postSpeechRecognize(@UploadedFile() file: Express.Multer.File) {
    console.log('post file', file.fieldname);
    return this.chatService
      .transcribeAudioIntoText(file)
      .then((response) => {
        console.log('transcribed', response);
        return response;
      })
      .catch(err => err);
  }

  @Get('models')
  public getAvailableModels() {
    return this.chatService.getModels()
      .then((response) => response.data.data)
      .catch(err => err);
  }
}
