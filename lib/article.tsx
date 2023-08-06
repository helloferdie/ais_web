import { APIResponse } from "@/types/api";
import { ArticleAPI } from "@/types/article";

export async function getArticles(params: {
  page: number;
  limit: number;
}): Promise<ArticleAPI> {
  const res = await fetch(
    "http://localhost:1000/articles?page=" +
      params.page.toString() +
      "&items_per_page=" +
      params.limit.toString(),
    {
      cache: "no-store",
    }
  );
  return res.json();
}

export async function saveArticle(data: {
  author: string;
  title: string;
  body: string;
}): Promise<APIResponse> {
  const res = await fetch("http://localhost:1000/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resSuccess) => {
      return resSuccess.json();
    })
    .catch(() => {
      const resErr = {
        success: false,
        code: 500,
        message: "Submit fail",
        error: "Submit fail",
      } as APIResponse;
      return resErr;
    });

  return res;
}
