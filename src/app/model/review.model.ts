
export class Review {
  id: number | null;
  accommodationId: number | null | undefined;
  ownerEmail: string | null | undefined;
  text: string;
  authorEmail: string | undefined;
  createdAt: Date;
  rating: number;

  constructor(
    id: number | null,
    ownerEmail: string | null | undefined,
    accommodationId: number | null | undefined,
    text: string,
    author: string | undefined,
    createdAt: Date,
    rating: number
  ) {
    this.id = id;
    this.ownerEmail = ownerEmail;
    this.accommodationId = accommodationId;
    this.text = text;
    this.authorEmail = author;
    this.createdAt = createdAt;
    this.rating = rating;
  }
}

