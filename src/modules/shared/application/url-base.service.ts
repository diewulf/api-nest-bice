import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlBaseService {

  private baseUrl: string;
  constructor(
    private readonly configService: ConfigService,
  ) {

    const isLocalEnvironment = this.configService.get('NODE_ENV') === 'local';
    const serverPort = this.configService.get<string>('SERVER_PORT');
    this.baseUrl = isLocalEnvironment ? `http://localhost:${serverPort}` : this.configService.get('URL_BASE');
  }
  urlFalabellaByUuid(uuid: string): string {
    return `${this.baseUrl}/url/pdf/${uuid}`
  }

  urlBase(): string {
    return this.baseUrl
  }

}