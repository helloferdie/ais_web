// const articles: {
//   id: number;
//   author: string;
//   body: string;
//   title: string;
//   [key: string]: any;
// }[] = [
//   {
//     author: "Gopher",
//     body: "Hello world",
//     created_at: "2023-06-25T20:14:17+07:00",
//     deleted_at: null,
//     id: 94,
//     title: "New title",
//     updated_at: "2023-06-25T20:14:17+07:00",
//   },
//   {
//     author: "O'Reilly Media, Inc",
//     body: "Perfect for beginners familiar with programming basics, this hands-on guide provides an easy introduction to Go, the general-purpose programming language from Google. Author Caleb Doxsey covers the language’s core features with step-by-step instructions and exercises in each chapter to help you practice what you learn. By the time you finish this book, not only will you be able to write real Go programs, you'll be ready to tackle advanced techniques.",
//     created_at: "2023-06-25T20:14:16+07:00",
//     deleted_at: null,
//     id: 93,
//     title: "Introducing Go",
//     updated_at: "2023-06-25T20:14:16+07:00",
//   },
//   {
//     author: "O'Reilly Media, Inc",
//     body: "Perfect for beginners familiar with programming basics, this hands-on guide provides an easy introduction to Go, the general-purpose programming language from Google. Author Caleb Doxsey covers the language’s core features with step-by-step instructions and exercises in each chapter to help you practice what you learn. By the time you finish this book, not only will you be able to write real Go programs, you'll be ready to tackle advanced techniques.",
//     created_at: "2023-06-25T20:14:16+07:00",
//     deleted_at: null,
//     id: 92,
//     title: "Introducing Go",
//     updated_at: "2023-06-25T20:14:16+07:00",
//   },
//   {
//     author: "O'Reilly Media, Inc",
//     body: "Perfect for beginners familiar with programming basics, this hands-on guide provides an easy introduction to Go, the general-purpose programming language from Google. Author Caleb Doxsey covers the language’s core features with step-by-step instructions and exercises in each chapter to help you practice what you learn. By the time you finish this book, not only will you be able to write real Go programs, you'll be ready to tackle advanced techniques.",
//     created_at: "2023-06-25T20:14:16+07:00",
//     deleted_at: null,
//     id: 91,
//     title: "Introducing Go",
//     updated_at: "2023-06-25T20:14:16+07:00",
//   },
//   {
//     author: "O'Reilly Media, Inc",
//     body: "Perfect for beginners familiar with programming basics, this hands-on guide provides an easy introduction to Go, the general-purpose programming language from Google. Author Caleb Doxsey covers the language’s core features with step-by-step instructions and exercises in each chapter to help you practice what you learn. By the time you finish this book, not only will you be able to write real Go programs, you'll be ready to tackle advanced techniques.",
//     created_at: "2023-06-25T20:14:12+07:00",
//     deleted_at: null,
//     id: 86,
//     title: "Introducing Go",
//     updated_at: "2023-06-25T20:14:12+07:00",
//   },
// ];

import { useState } from "react";

interface APIResponse {
  success: boolean;
  code: number;
  message: string;
  error: string;
}

interface Article {
  id: number;
  author: string;
  body: string;
  title: string;
  [key: string]: any;
}

interface APIArticle extends APIResponse {
  data: null | {
    total_items: number;
    total_pages: number;
    items: Article[];
  };
}

async function getArticles(): Promise<APIArticle> {
  const res = await fetch(
    "http://localhost:1000/articles?page=1&items_per_page=10"
  );
  // // The return value is *not* serialized
  // // You can return Date, Map, Set, etc.

  // // Recommendation: handle errors
  // if (!res.ok) {
  //   console.log("im here");
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error("Failed to fetch data");
  // }

  // const resp: APIArticle = await res.json();
  // return resp.data ? resp.data.items : [];

  return res.json();
}

export default async function ArticlePage() {
  //const [current, setCurrent] = useState(0)
  const articles = await getArticles();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Articles</h1>
          <p className="mt-2 text-sm text-gray-700">List of articles</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add article
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          {/* Table head */}
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Title
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Author
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Excerpt
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          {/* Table content */}
          <tbody className="divide-y divide-gray-200 bg-white">
            {articles.success &&
              articles.data &&
              articles.data.items.map((article) => {
                return (
                  <tr key={article.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {article.title}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {article.author}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      <p className="line-clamp-2">{article.body}</p>
                    </td>
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
