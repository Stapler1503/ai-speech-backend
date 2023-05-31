import {
  Controller,
  Get,
  Post,
  RawBodyRequest,
  Req,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Post()
  public async postChatMessage(@Req() req: RawBodyRequest<Request>) {
    const prompt = req.body['message'];

    return await this.chatService
      .chatCompletion(prompt, 0, 200)
      .then((response) => response.data)
      .catch((err) => {
        throw new Error(err);
      });
  }

  @Post('speech-recognize')
  @UseInterceptors(FileInterceptor('audioFile'))
  public async postSpeechRecognize(@UploadedFile() file: unknown) {
    const buffer = file['buffer'];
    const fileStream = Readable.from(buffer) as any;
    fileStream.path = 'audioFile.webm';

    const result = await this.chatService
      .transcribeAudioIntoText(fileStream)
      .then((response) => response)
      .catch((err) => {
        throw new Error(err);
      });

    return result['data'];
  }

  @Get('models')
  public getAvailableModels() {
    return this.chatService
      .getModels()
      .then((response) => response.data.data)
      .catch(err => err);
  }
}
