export type PlatformType = 'whatsapp' | 'tiktok' | 'instagram' | 'twitter';

export interface WhatsAppData {
  name?: string;
  photo?: string;
  followers?: string;
  originalUrl?: string;
}

export interface SocialAccountData {
  id?: string;
  photo?: string;
  username?: string;
  name?: string;
  posts?: number;
  followers?: number;
  following?: number;
  likes?: number;
  verified?: boolean;
  private?: boolean;
  bio?: string;
}

export interface StalkerResult<T = any> {
  status: boolean;
  author?: string;
  statusCode?: number;
  message?: string;
  data?: T;
  rawJson?: any;
}
