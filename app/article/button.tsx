"use client";
import { useTransition } from "react";
import { deleteArticle } from "@/actions/article";

export function DeleteArticleButton(props: {
  id: number;
  page: number;
  limit: number;
}) {
  let [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      type="button"
      className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
      onClick={() =>
        startTransition(() => deleteArticle(props.id, props.page, props.limit))
      }
    >
      Delete
    </button>
  );
}
