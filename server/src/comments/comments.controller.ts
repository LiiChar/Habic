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
        return this.commentsService.getAllComments()
    }

    @Get(':id')
    async getComment(@Body() getCommentDto: GetCommentsDto): Promise<IComment> {
        return this.commentsService.getCommentById(getCommentDto)
    }

    @Post()
    createComment(@Body() createCommentDto: CreateCommentDto): IComment {
        return this.commentsService.createComment(createCommentDto)
    }

    @Delete()
    deleteComment(@Body() deleteCommentDto: DeleteCommentDto): IComment {
        return this.commentsService.deleteCommentById(deleteCommentDto)
    }

    @Put()
    updateComment(@Body() updateCommentDto: UpdateCommemtDto): IComment {
        return this.commentsService.updateCommentById(updateCommentDto)
    }
}
