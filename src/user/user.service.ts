import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await    this.userRepository.find()
    }

    async findOne(id: string): Promise<User> {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid UUID format.');
        }
        
       const user = await this.userRepository.findOneBy({ id })

       if(!user){
        throw new NotFoundException('User with given id is not found.')
       }

       return user
    }

    async create(user: CreateUserDto): Promise<User> {
        const newUser = await this.userRepository.create(user)
        
        return await this.userRepository.save(newUser)
    }

    async updateOne(id: string, userDto: UpdateUserDto): Promise<User> {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid UUID format.');
        }

        const user = await this.userRepository.findOneBy({ id })
 
        if(!user){
         throw new NotFoundException('User with given id is not found.')
        }

        Object.assign(user, userDto);

        return await this.userRepository.save(user)
     }

    async deleteOne(id: string): Promise<User> {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid UUID format.');
        }

        const user = await this.userRepository.findOneBy({ id })
 
        if(!user){
         throw new NotFoundException('User with given id is not found.')
        }
 
        await this.userRepository.delete(id);

        return user
     }
}
function isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}