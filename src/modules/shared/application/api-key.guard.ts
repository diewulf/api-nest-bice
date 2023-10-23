// api.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiGuard implements CanActivate {
    private readonly apiKey = '3eec1301-11bf-49b5-a842-3570492e9822';
    
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