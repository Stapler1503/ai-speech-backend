import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ChatModule,
    MulterModule.register({
      dest: './chat',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
