import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { PostsService } from './posts.service';

@Controller('posts')
@ApiTags('Посты')
@UseGuards(JwtAuthGuard)
export class PostsController {

    constructor(private postsService: PostsService) {}

    @Post('/add-new-comment')
    addNewCommentToUserPost(@Req() request: Request) {
        return this.postsService.addNewCommentToUserPost(request);
    }

    @Post('/get-all-comments')
    getAllPostCommentsByPostId(@Req() request: Request) {
        return this.postsService.getAllPostCommentsByPostId(request);
    }

    @Post('/get-page-comments')
    getAllPostCommentsByPostIdPagination(@Req() request: Request) {
        return this.postsService.getAllPostCommentsByPostIdPagination(request);
    }
    
}
