import { Injectable, Logger, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { jwtConstants } from '../auth/constant';
import { Repository } from 'typeorm';
import { CreateUsereDto } from './create-user.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';
import { SharedBusinessErrors } from '../shared/shared.business-errors';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findOneAsync(username: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ username: username });
        if (!user) throw new NotFoundException();
        return user;
    }

    async createAsync(createUsereDto: CreateUsereDto): Promise<User> {
        if (await this.isUsernameExistAsync(createUsereDto.username)) 
            throw new NotAcceptableException(SharedBusinessErrors.InvalidItem);
            
        let user = this.userRepository.create(createUsereDto)
        user.password = await bcrypt.hash(user.password, jwtConstants.saltOrRounds)
        return this.userRepository.save(user);
    }

    async isUsernameExistAsync(username: string): Promise<boolean> {
        try {
            await this.findOneAsync(username);
            return true;
        }
        catch(NotFoundException) {
            return false;
        }
        
    }
}