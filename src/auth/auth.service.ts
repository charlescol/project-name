import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtTokenService: JwtService){}

    async validateUserCredentialsAsync(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneAsync(username);

        if (user && await bcrypt.compare(password, user.password)) {
            const {password, ...result} = user
            return result
        }
        return null
    }

    async loginWithCredentialsAsync(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtTokenService.sign(payload),
        };
    }
}