import { writable, derived } from "svelte/store";

type Book = {
  id: string;
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
export const fetching = derived(state, (v) => v.fetching);

export const fetchBooks = async (keyword: string): Promise<void> => {
  state.update((value) => ({
    ...value,
    fetching: true,
  }));

  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${keyword}`
  ).then((data) => data.json());

  state.set({
    ...res,
    fetching: false,
  });
};
