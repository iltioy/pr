import { PlaylistType, SongType } from "../types";
import { faker } from "@faker-js/faker";

export let playlist: PlaylistType = {
  owner: {
    email: faker.person.fullName(),
    image: {
      image_url: faker.image.url(),
    },
    role: "user",
    username: faker.person.fullName(),
  },
  image: {
    image_url: faker.image.url(),
  },
  id: 1,
  name: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aspernatur veniam eligendi quia odit quasi in, laborumsunt. Quos, aliquam? Autem unde ut porro rerum quoscorporis vel modi suscipit iure.",
  order: 1,
  songs: [],
};

let data: SongType[] = [];

for (let i = 0; i < 10; i++) {
  data.push({
    id: faker.number.int(100),
    album: faker.music.genre(),
    author: faker.person.fullName(),
    image: {
      image_url: faker.image.url(),
    },
    // title: faker.music.songName(),
    name: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aspernatur veniam eligendi quia odit quasi in, laborumsunt. Quos, aliquam? Autem unde ut porro rerum quoscorporis vel modi suscipit iure.",
    owner: playlist.owner,
    url: "askd",
  });
}

let playlistData: PlaylistType[] = [];

for (let i = 0; i < 10; i++) {
  playlistData.push({
    owner: {
      email: faker.person.fullName(),
      image: {
        image_url: faker.image.url(),
      },
      role: "user",
      username: faker.person.fullName(),
    },
    image: {
      image_url: faker.image.url(),
    },
    id: 1,
    name: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aspernatur veniam eligendi quia odit quasi in, laborumsunt. Quos, aliquam? Autem unde ut porro rerum quoscorporis vel modi suscipit iure.",
    order: 1,
    songs: [],
  });
}

export const playlists = playlistData;
export const songs = data;
