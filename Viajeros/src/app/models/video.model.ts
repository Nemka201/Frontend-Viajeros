import { Tag } from "./tag.model";

export interface Video {
    id?: number;
    name: string;
    description: string;
    videoLink: string;
    videoLinkSecond?: string;
    videoLinkThird?: string;
    videoLinkFourth?: string;
    tags: VideoTag[];
  }

export interface VideoTag {
    id?: number;
    videoID?: number;
    video?: Video;
    tagId: number;
    tag?: Tag;
} 
