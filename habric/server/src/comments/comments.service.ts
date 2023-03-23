import { UpdateCommemtDto } from './dto/update-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsDto } from './dto/get-comments.dto';
import { Injectable } from '@nestjs/common';
import { IComment } from 'src/types/comment';

@Injectable()
export class CommentsService {
    private readonly comments: IComment[] = [{author: 'bot', id: 0, text: '10', to: 12543534523452}]

    getAllComments(): IComment[] {
        return this.comments
    }

    getCommentById(getCommentsDto: GetCommentsDto): IComment {
        return this.comments.find((comment) => comment.id === getCommentsDto.id)
    }

    createComment(createcommentDto: CreateCommentDto): IComment {
        const id = this.comments.at(-1).id + 1 || 0;
        const newcomment = {id, ...createcommentDto}
        this.comments.push(newcomment)
        return newcomment
    }

    deleteCommentById(deletecommentDto: DeleteCommentDto): IComment {
        const commentIndex = this.comments.findIndex((comment) => comment.id === deletecommentDto.id)
        const comment = this.comments[commentIndex]
        const delComment = this.comments.splice(commentIndex)
        return comment
    }

    updateCommentById(updatecommentDto: UpdateCommemtDto): IComment {
        const commentIndex = this.comments.findIndex((comment) => comment.id === updatecommentDto.id)
        const comment:IComment = this.comments[commentIndex]
        const updatedcomment:IComment = {id: comment.id, author: updatecommentDto.author || comment.author, text: updatecommentDto.text || comment.text, to: updatecommentDto.to ||  comment.to }
        this.comments[commentIndex] = updatedcomment
        return comment
    }
}

