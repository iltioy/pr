import { makeAutoObservable } from "mobx";

class SettingsStore {
  topRef: React.MutableRefObject<HTMLDivElement | null> | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTopRef(ref: React.MutableRefObject<HTMLDivElement | null>) {
    this.topRef = ref;
  }
}

export default new SettingsStore();
