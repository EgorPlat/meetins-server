import { Controller, Get, Body, Post, UseGuards, Req, UseInterceptors, UploadedFile, Param, Delete, Put, UploadedFiles } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/modules/auth/jwt-auth.guard";
import { CreateUserDto } from "src/dto/create-user.dto";
import { ISortParams } from "src/interfaces/sort.params";
import { User } from "src/schemas/user.schema";
import { UserService } from "./users.service";
import { People } from "src/interfaces/people.interface";
import { Request } from "express";
import { diskStorage } from "multer";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { FinallMulterOptions } from "src/middlewares/fileSize.middleware";

@ApiTags('Пользователи')
@Controller('/users')
@UseGuards(JwtAuthGuard)
export class UserController {

    constructor(private userService: UserService) {}

    @Get('/newData')
    updateUserData() {
        return this.userService.updateUsersData(); 
    }

    @ApiOperation({summary: 'Список пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getUsers() {
        return this.userService.getUsers(); 
    }

    @ApiOperation({summary: 'Создать пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post()
    addUser(@Body() userDto: CreateUserDto) {
        return this.userService.addUser(userDto); 
    }

    @ApiOperation({summary: 'Получить пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post('/getUserByLogin')
    getUserByLogin(@Body() login: string) {
        return this.userService.getUserByLogin(login);
    }

    @ApiOperation({summary: 'Получить пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post('/getUserByUserId')
    getUserByUserId(@Req() req: Request) {
        return this.userService.getUserByUserId(req.body.userId);
    }

    
    @ApiOperation({summary: 'Удалить интерес пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post('/removeUserInterest')
    removeUserInterest(@Req() req: Request) {
        return this.userService.removeUserInterest(req); 
    }

    @ApiOperation({summary: 'Обновить интересы пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post('/updateUserInterest')
    updateUserInterest(@Req() req: Request) {
        return this.userService.updateUserInterest(req); 
    }

    @ApiOperation({summary: 'Получить список пользователей'})
    @ApiResponse({status: 200, type: User})
    @Get('/getUserList')
    getUserList() {
        return this.userService.getUserList(); 
    }

    @ApiOperation({summary: 'Получить список пользователей по номеру страницы'})
    @ApiResponse({status: 200, type: User})
    @Post('/getUserListByPageNumber')
    getUserListByPageNumber(@Req() request: Request) {
        return this.userService.getUserListByPageNumber(request); 
    }

    @ApiOperation({summary: 'Добавить пользователя в список закладок'})
    @ApiResponse({status: 200, type: User})
    @Post('/addUserIntoMarkedList')
    addUserIntoMarkedList(@Req() request: Request) {
        return this.userService.addUserIntoMarkedList(request); 
    }

    @ApiOperation({summary: 'Удалить пользователя из списка закладок'})
    @ApiResponse({status: 200, type: User})
    @Delete('/removeUserFromMarkedList/:userId')
    removeUserFromMarkedList(@Param() params: any, @Req() request: Request) {
        return this.userService.removeUserFromMarkedList(request, params.userId); 
    }

    @ApiOperation({summary: 'Получить список пользователей в закладках'})
    @ApiResponse({status: 200, type: User})
    @Get('/getMarkedUsersInfo')
    getMarkedUsersInfo(@Req() request: Request) {
        return this.userService.getMarkedUsersInfo(request); 
    }
    
    @ApiOperation({summary: 'Получить список сортированных пользователей'})
    @ApiResponse({status: 200, type: User})
    @Post('/getSortedUsers')
    getSortedPeoples(@Body() sortParams: ISortParams) {
        return this.userService.getSortedPeoples(sortParams); 
    }

    @ApiOperation({summary: 'Добавить новое мероприятие для пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post('/addUserEvent')
    addUserEvent(@Req() request: Request) {
        return this.userService.addUserEvent(request); 
    }

    @ApiOperation({summary: 'Удалить мероприятие для пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post('/deleteUserEvent')
    deleteUserEvent(@Req() request: Request) {
        return this.userService.deleteUserEvent(request); 
    }

    @ApiOperation({summary: 'Обновить тег пользователя'})
    @ApiResponse({status: 200, type: User})
    @Put('/updateUserTag')
    updateUserTag(@Req() request: Request) {
        return this.userService.updateUserTag(request); 
    }

    @Post('/addUserPost')
    @UseInterceptors(FilesInterceptor('media', 5, FinallMulterOptions))
    addUserPost(@UploadedFiles() files, @Req() request: Request) {
        return this.userService.addUserPost(files, request);
    }

    @ApiOperation({summary: 'Лайкнуть пост'})
    @ApiResponse({status: 200, type: User})
    @Put('/like/:userId/:postId')
    addLikeToUserPost(@Param() params: any, @Req() request: Request) {
        return this.userService.addLikeToUserPost(request, params.postId, params.userId); 
    }

    @ApiOperation({summary: 'Удалить лайк на посте'})
    @ApiResponse({status: 200, type: User})
    @Put('/remove-like/:userId/:postId')
    removeLikeFromUserPost(@Param() params: any, @Req() request: Request) {
        return this.userService.removeLikeFromUserPost(request, params.postId, params.userId); 
    }
}