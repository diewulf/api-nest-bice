// api.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiGuard implements CanActivate {
    private readonly apiKey = null;
    constructor(private readonly configService: ConfigService){
        this.apiKey = this.configService.get('X_API_KEY');
    }
    
    canActivate(context: ExecutionContext): boolean {

        const request = context.switchToHttp().getRequest();
        const apiKeyHeader = request.headers['x-api-key'];

        if (apiKeyHeader !== this.apiKey) {
            throw new UnauthorizedException();
        }

        // Verifica si 'api-key' está presente en los encabezados
        return apiKeyHeader;
    }
}