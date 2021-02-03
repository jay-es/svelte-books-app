import { writable, derived, get } from "svelte/store";

export type Book = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
    publisher?: string;
    publishedDate?: string;
    categories?: string[];
    pageCount?: number;
    description?: string;
  };
};

type Result = {
  totalItems: number;
  items: Book[];
};
type Params = {
  keyword: string;
  page: number;
  pageSize: number;
};
type Store = Result & {
  fetching: boolean;
  params: Params;
};

const store = writable<Store>({
  totalItems: 0,
  items: [],
  fetching: false,
  params: {
    keyword: "",
    page: 0,
    pageSize: 20,
  },
});

export const fetchBooks = async (params: Partial<Params>): Promise<void> => {
  store.update((value) => ({
    ...value,
    fetching: true,
    params: { ...value.params, ...params },
  }));

  const { keyword, page, pageSize } = get(store).params;
  const res: Partial<Result> = await fetch(
    "https://www.googleapis.com/books/v1/volumes" +
      `?q=${keyword}&maxResults=${pageSize}&startIndex=${page * pageSize}`
  ).then((data) => data.json());

  store.update((value) => ({
    ...value,
    totalItems: res.totalItems ?? 0, // エラーだとない
    items: res.items ?? [], // 存在しないページ番号だとない
    fetching: false,
  }));
};

// readonly で export
export const totalItems = derived(store, (v) => v.totalItems);
export const books = derived(store, (v) => v.items);
export const params = derived(store, (v) => v.params);
export const fetching = derived(store, (v) => v.fetching);
