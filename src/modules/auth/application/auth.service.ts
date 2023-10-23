import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../domain/interfaces/jwt-payload.interface";
import { UserDetails } from "../domain/user.types";
import { AuthDto } from "./dto/auth.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        /* @InjectRepository(User) private readonly userRepository: Repository<User>, */
        private jwtService: JwtService,
        private env : ConfigService
    ) { }

    async validateUser(userDetails: UserDetails) {
        const { email } = userDetails
        console.log("🚀 ~ file: auth.service.ts:18 ~ AuthService ~ validateUser ~ userDetails:", userDetails)
        /* const user = await this.userRepository.findOneBy({
            email: email
        }) */

        const user = "algo"
        if (user) return user
    }

    async login(authDto: AuthDto): Promise<{ access_token: string }> {
        const { password, user } = authDto
        if(user !== "bice-wellness" || password !== this.env.get('BICE_PASS')){
            throw new UnauthorizedException();
        }
        // TODO 
        const payload: JwtPayload = {
            id: 1,
            email: "2"
        }
        return { access_token: user ? await this.jwtService.signAsync(payload) : "" };
    }

}