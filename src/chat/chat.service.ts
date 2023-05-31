import { Injectable, OnModuleInit } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { openaiApiKeyConst } from '../consts/openai-api-key.const';

@Injectable()
export class ChatService implements OnModuleInit {
  public openai: OpenAIApi;

  public onModuleInit(): void {
    const configuration = new Configuration({
      apiKey: openaiApiKeyConst
    });
    this.openai = new OpenAIApi(configuration);
  }

  public async chatCompletion(
    prompt: string,
    temperature: number,
    maxTokens: number,
  ) {
    return await this.openai.createChatCompletion(
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: maxTokens,
        temperature,
      },
      {},
    );
  }

  public async transcribeAudioIntoText(stream) {
    return await this.openai.createTranscription(stream, 'whisper-1');
  }

  public async getModels() {
    return await this.openai.listModels();
  }
}
