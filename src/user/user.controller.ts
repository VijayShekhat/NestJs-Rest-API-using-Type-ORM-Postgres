import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getAllUser(){
        return await this.userService.findAll()
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.userService.findOne(id)
    }

    @Post()
    async createUser(@Body() user: CreateUserDto){
        return await this.userService.create(user)
    }

    @Put(':id')
    async updateBook(@Param('id') id: string, @Body() body: CreateUserDto) {
        return this.userService.updateOne(id, body)
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: string) {
        return await this.userService.deleteOne(id)
    }

}
