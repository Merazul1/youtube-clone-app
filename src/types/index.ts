export interface Comment {
  id: string;
  videoId: string;
  userName: string;
  userAvatar: string;
  timeAgo: string;
  text: string;
  likes: number;
  isLiked?: boolean;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  channelName: string;
  channelAvatar: string;
  channelId: string;
  subscribers: string;
  isVerified: boolean;
  views: string;
  viewsCount: number;
  timestamp: string;
  uploadedAt: string;
  likes: string;
  likesCount: number;
  category: string;
  tags: string[];
  commentsCount: number;
  isShort?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  avatar: string;
  subscribers: string;
  verified: boolean;
  handle: string;
}
