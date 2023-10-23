import { Body, Controller, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../application/auth.service';
import { ApiTags, ApiOperation, ApiSecurity, ApiResponse } from '@nestjs/swagger';
import { AuthDto } from '../application/dto/auth.dto';
import { ApiGuard } from '../../shared/application/api-key.guard';



@ApiTags('auth')
@ApiSecurity('X-API-KEY')
@UseGuards(ApiGuard)
@Controller('auth')
export class AuthController {

    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Login auth' })
    @ApiResponse({
        status: 401,
        description: 'No tienes permiso para acceder a esta ruta. Asegúrate de incluir el encabezado x-api-key en tu solicitud.',
    })
    async handleLogin(@Body() authDto: AuthDto, @Res() res: Response): Promise<{ access_token: string }> {
        const jwt = await this.authService.login(authDto)
        res.status(200).send(jwt);
        return jwt
    }


}