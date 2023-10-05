import userStore from "./user-store";
import playlistsStore from "./playlists-store";
import authStore from "./auth-store";
import songsStore from "./songs-store";
import settingsStore from "./settings-store";
import modalsStore from "./modals-store";

class RootStore {
  userStore = userStore;
  playlistsStore = playlistsStore;
  authStore = authStore;
  songsStore = songsStore;
  settingsStore = settingsStore;
  modalsStore = modalsStore;
}

export default RootStore;
