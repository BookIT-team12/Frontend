import { User } from './user.model';

export abstract class Review {
  id: number;
  text: string;
  author: User;
  createdAt: Date;
  rating: number;
  reviewType: string;

  constructor(
    id: number,
    text: string,
    author: User,
    createdAt: Date,
    rating: number,
    reviewType: string
  ) {
    this.id = id;
    this.text = text;
    this.author = author;
    this.createdAt = createdAt;
    this.rating = rating;
    this.reviewType = reviewType;
  }
}
