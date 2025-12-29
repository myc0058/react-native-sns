export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface Post {
  id: string;
  content: string;
  imageUri?: string;
  location?: Location;
  createdAt: Date;
  author: {
    name: string;
    avatarUri?: string;
  };
  likes: number;
  comments: number;
}
