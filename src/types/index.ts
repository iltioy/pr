export interface SongType {
  id: number;
  name: string;
  url: string;
  author: string;
  album?: string;
  image: ImageType;
  owner: UserType;
}

export interface OrderedSongType {
  order: number;
  song: SongType;
}

export const enum RadioSubPage {
  ALL = "ВСЁ",
  NEW = "НОВИНКИ",
  TRENDS = "В ТРЕНДЕ",
}

export interface ImageType {
  image_key?: string;
  image_url?: string;
}

export interface PlaylistType {
  id: number;
  name: string;
  is_favorite?: boolean;
  image: ImageType;
  owner: UserType;
  order: number;
  songs: OrderedSongType[];
}

export interface OrderedPlaylist {
  order: number;
  playlist: PlaylistType;
}

export interface UserType {
  username?: string;
  email?: string;
  role?: string;
  image?: ImageType;
}

export interface CreateSongBody {
  name: string;
  url: string;
  author: string;
  album?: string;
  image?: ImageType;
}
