import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { Injectable } from '@nestjs/common';
import { JwtPayload } from "../domain/interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExipration: false,
            secretOrKey: process.env.JWT_STRATEGY_SECRET
        })
    }

    async validate(username: string, password: string):Promise<any> {

        return 'suceess';
    }


}