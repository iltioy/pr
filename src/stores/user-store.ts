import { makeAutoObservable } from "mobx";
import { Playlist, Song } from "../types";

interface User {
    id?: number;
    username?: string;
    email?: string;
    role?: string;
    image_url?: string;
}

class UserStore {
    user: User = JSON.parse(localStorage.getItem("user")!) || {};

    access_token?: string | null = localStorage.getItem("access_token") || null;
    refresh_token?: string | null =
        localStorage.getItem("refresh_token") || null;

    constructor() {
        makeAutoObservable(this);
    }

    setTokens(access_token: string, refresh_token: string) {
        this.access_token = access_token;
        this.refresh_token = refresh_token;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
    }

    setUserInfo(data: User) {
        this.user = {
            email: data.email,
            image_url: data.image_url,
            role: data.role,
            username: data.username,
        };

        localStorage.setItem("user", JSON.stringify(this.user));
    }

    logout() {
        this.user = {};
        this.access_token = null;
        this.refresh_token = null;

        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }
}

export default new UserStore();
