import { OrderedPlaylist, PlaylistType } from "../types";

export const extractPlaylistsFromOrderd = (
    orderedPlaylists: OrderedPlaylist[] | undefined
) => {
    if (!orderedPlaylists) return [];
    let playlists: PlaylistType[] = [];

    orderedPlaylists?.forEach((orderedPlaylist) => {
        playlists.push(orderedPlaylist.playlist);
    });

    return playlists;
};
