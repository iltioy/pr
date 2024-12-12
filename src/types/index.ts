enum Genre {
    hipHop = "hipHop",
    pop = "pop",
    rap = "rap",
}

enum Mood {
    calm = "calm",
    cheerful = "cheerful",
    sad = "sad",
}

enum Language {
    russian = "russian",
    english = "english",
    nowords = "nowords",
}

export interface Song {
    id: number;
    name: string;
    url: string;
    author: string;
    album?: string;
    image_url: string;
    owner: User;

    genre?: Genre;
    mood?: Mood;
    language?: Language;

    order?: number;
}

export const enum RadioSubPage {
    ALL = "ВСЁ",
    NEW = "НОВИНКИ",
    TRENDS = "В ТРЕНДЕ",
}

export interface Playlist {
    id: number;
    name: string;
    is_favorite?: boolean;
    image_url: string;
    owner: User;
    order: number;
    songs: Song[];
}

export interface User {
    id?: number;
    email?: string;
    username?: string;
    role?: string;
    image_url?: string;
}

export interface CreateSongBody {
    name: string;
    url: string;
    author: string;
    album?: string;
    image_url?: string;
}

export interface Category {
    id: number;
    name: string;
    playlists: Playlist[];
    owner: User;
}
