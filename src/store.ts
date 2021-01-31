import { writable, derived, get } from "svelte/store";

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

type SearchResult = {
  totalItems: number;
  items: Book[];
};
const result = writable<SearchResult>({
  totalItems: 0,
  items: [],
});

type SearchParams = {
  keyword: string;
  page: number;
  pageSize: number;
};
type SearchState = SearchParams & {
  fetching: boolean;
};
const searchState = writable<SearchState>({
  fetching: false,
  keyword: "",
  page: 0,
  pageSize: 20,
});

// readonly で export
export const totalItems = derived(result, (v) => v.totalItems);
export const books = derived(result, (v) => v.items);
export const formData = derived(searchState, (v) => v);

export const fetchBooks = async (
  params: Partial<SearchParams>
): Promise<void> => {
  searchState.update((value) => ({
    ...value,
    ...params,
    fetching: true,
  }));

  const { keyword, page, pageSize } = get(searchState);
  const res: Partial<SearchResult> = await fetch(
    "https://www.googleapis.com/books/v1/volumes" +
      `?q=${keyword}&maxResults=${pageSize}&startIndex=${page * pageSize}`
  ).then((data) => data.json());

  searchState.update((value) => ({
    ...value,
    fetching: false,
  }));

  // ありえないページの場合 items がない、エラーの場合は totalItems もない
  result.set({
    totalItems: res.totalItems ?? 0,
    items: res.items ?? [],
  });
};
