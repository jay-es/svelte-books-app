import { writable, derived } from "svelte/store";

export type Book = {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
  };
};

type State = {
  totalItems: number;
  books: Book[];
  fetching: boolean;
};

const state = writable<State>({
  totalItems: 0,
  books: [],
  fetching: false,
});

// readonly で export
export const totalItems = derived(state, (v) => v.totalItems);
export const books = derived(state, (v) => v.books);
export const fetching = derived(state, (v) => v.fetching);

export const fetchBooks = async (keyword: string): Promise<void> => {
  state.update((value) => ({
    ...value,
    fetching: true,
  }));

  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=20`
  ).then((data) => data.json());

  state.set({
    totalItems: res.totalItems,
    books: res.items,
    fetching: false,
  });
};
