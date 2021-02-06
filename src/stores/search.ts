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
export const qModes = [
  { text: "Any", value: "" },
  { text: "Title", value: "intitle:" },
  { text: "Author", value: "inauthor:" },
  { text: "Publisher", value: "inpublisher:" },
  { text: "ISBN", value: "isbn:" },
] as const;
export const orderBys = ["relevance", "newest"] as const;

type Params = {
  keyword: string;
  orderBy: typeof orderBys[number];
  page: number;
  pageSize: number;
  qMode: typeof qModes[number]["value"];
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
    orderBy: orderBys[0],
    page: 0,
    pageSize: 20,
    qMode: qModes[0].value,
  },
});

type Req = (params: Params) => Promise<Partial<Result>>;
const request: Req = ({ keyword, orderBy, page, pageSize, qMode }) =>
  fetch(
    "https://www.googleapis.com/books/v1/volumes" +
      `?q=${qMode}${keyword}&orderBy=${orderBy}` +
      `&maxResults=${pageSize}&startIndex=${page * pageSize}`
  ).then((data) => data.json());

export const fetchBooks = async (params: Partial<Params>): Promise<void> => {
  store.update((value) => ({
    ...value,
    fetching: true,
    params: { ...value.params, ...params },
  }));

  const res = await request(get(store).params);

  store.update((value) => ({
    ...value,
    totalItems: res.totalItems ?? 0, // エラーだとない
    items: res.items ?? [], // 存在しないページ番号だとない
    fetching: false,
  }));

  if (process.env.isDev) {
    // ストレージに保存
    sessionStorage.setItem("SEARCH", JSON.stringify(get(store)));
  }
};

if (process.env.isDev) {
  // ストレージから復元
  store.update((value) => ({
    ...value,
    ...JSON.parse(sessionStorage.getItem("SEARCH")),
  }));
}

// readonly で export
export const totalItems = derived(store, (v) => v.totalItems);
export const books = derived(store, (v) => v.items);
export const params = derived(store, (v) => v.params);
export const fetching = derived(store, (v) => v.fetching);
