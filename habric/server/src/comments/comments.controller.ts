import { UpdateCommemtDto } from './dto/update-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { IComment } from './../types/comment';
import { CommentsService } from './comments.service';
import { Controller, Get, Body, Post, Delete, Put } from '@nestjs/common';
import { GetCommentsDto } from './dto/get-comments.dto';

@Controller('comments')
export class CommentsController {
    constructor (private commentsService: CommentsService) {}

    @Get()
    async getAllComment(): Promise<IComment[]> {
        return await this.commentsService.getAllComments()
    }

    @Get(':id')
    async getComment(@Body() getCommentDto: GetCommentsDto): Promise<IComment> {
        return await this.commentsService.getCommentById(getCommentDto)
    }

    @Post()
    async createComment(@Body() createCommentDto: CreateCommentDto): Promise<IComment> {
        return await this.commentsService.createComment(createCommentDto)
    }

    @Delete()
    async deleteComment(@Body() deleteCommentDto: DeleteCommentDto): Promise<IComment> {
        return await this.commentsService.deleteCommentById(deleteCommentDto)
    }

    @Put()
    async updateComment(@Body() updateCommentDto: UpdateCommemtDto): Promise<IComment> {
        return await this.commentsService.updateCommentById(updateCommentDto)
    }
    
}
