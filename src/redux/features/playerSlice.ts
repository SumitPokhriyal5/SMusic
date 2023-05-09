import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Song {
  track: {
    title: string;
    artist: string;
    album: string;
  };
  data?: {
    tracks?: any;
    properties?: any;
  };
  i: number;
}

interface PlayerState {
  currentSongs: any;
  currentIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  activeSong: Song;
  genreListId: string;
}

const initialState: PlayerState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {
    track: {
      title: "",
      artist: "",
      album: "",
    },
    data: {},
    i: 0,
  },
  genreListId: "",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (state, action: PayloadAction<Song>) => {
      state.activeSong = action.payload;

      if (action.payload?.data?.tracks?.hits) {
        state.currentSongs = action.payload.data.tracks.hits;
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.data?.tracks;
      } else {
        state.currentSongs = action.payload.data;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state) => {
      const nextIndex = state.currentIndex + 1;
      if (state.currentSongs[nextIndex]?.track) {
        state.activeSong = state.currentSongs[nextIndex]?.track;
      } else {
        state.activeSong = state.currentSongs[nextIndex];
      }

      state.currentIndex = nextIndex;
      state.isActive = true;
    },

    prevSong: (state) => {
      const prevIndex = state.currentIndex - 1;
      if (state.currentSongs[prevIndex]?.track) {
        state.activeSong = state.currentSongs[prevIndex]?.track;
      } else {
        state.activeSong = state.currentSongs[prevIndex];
      }

      state.currentIndex = prevIndex;
      state.isActive = true;
    },

    playPause: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action: PayloadAction<string>) => {
      state.genreListId = action.payload;
    },
  },
});

export const {
  setActiveSong,
  nextSong,
  prevSong,
  playPause,
  selectGenreListId,
} = playerSlice.actions;

export default playerSlice.reducer;
