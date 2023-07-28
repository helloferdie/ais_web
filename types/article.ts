import { APIResponse } from "./api";

export interface Article {
  id: number;
  author: string;
  body: string;
  title: string;
  [key: string]: any;
}

export interface ArticleAPI extends APIResponse {
  data: null | {
    total_items: number;
    total_pages: number;
    items: Article[];
  };
}
