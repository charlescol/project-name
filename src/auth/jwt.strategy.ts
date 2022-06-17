import { Inject, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./constant";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //method using which we will extract the JWT
            ignoreExpiration: false, //  block requests with expired tokens
            secretOrKey: jwtConstants.secret
        })
        Logger.log(configService);
        
    }

    async validate(payload: any) {
        return {userId: payload.sub, username: payload.username}
    }
}