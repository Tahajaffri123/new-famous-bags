import { Injectable, signal } from '@angular/core';

export interface Comment {
  id: string;
  productId: string;
  author: string;
  text: string;
  upvotes: number;
  downvotes: number;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentsSignal = signal<Comment[]>([]);

  comments = this.commentsSignal.asReadonly();

  getCommentsForProduct(productId: string) {
    return this.commentsSignal().filter(c => c.productId === productId);
  }

  addComment(productId: string, author: string, text: string) {
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      productId,
      author,
      text,
      upvotes: 0,
      downvotes: 0,
      date: new Date()
    };
    this.commentsSignal.update(comments => [...comments, newComment]);
  }

  upvoteComment(commentId: string) {
    this.commentsSignal.update(comments => 
      comments.map(c => c.id === commentId ? { ...c, upvotes: c.upvotes + 1 } : c)
    );
  }

  downvoteComment(commentId: string) {
    this.commentsSignal.update(comments => 
      comments.map(c => c.id === commentId ? { ...c, downvotes: c.downvotes + 1 } : c)
    );
  }
}
