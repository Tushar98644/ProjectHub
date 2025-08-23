import Comment from "@/db/models/comment";
import { Comment as CommentType } from "@/types/comment";
import connectToDB from "@/lib/mongoose";

class CommentService {
    public async getComments(threadId: string) {
        await connectToDB();
        return await Comment.find({ threadId });
    }

    public async createComment(commentData: {
        threadId: string;
        content: string;
        author: string;
        authorAvatar: string;
    }): Promise<CommentType> {
        await connectToDB();
        const comment = new Comment(commentData);
        return await comment.save();
    }
}

export const commentService = new CommentService();
