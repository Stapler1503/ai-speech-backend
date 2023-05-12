import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';

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

  @Get('models')
  public getAvailableModels() {
    return this.chatService.getModels()
      .then((response) => response.data.data);
  }
}
