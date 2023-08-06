"use server";

import { revalidatePath } from "next/cache";

export async function deleteArticle(id: number, page: number, limit: number) {
  await fetch("http://localhost:1000/articles/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  revalidatePath("/");
}
