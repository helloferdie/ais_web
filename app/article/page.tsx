import { ArticleAPI } from "@/types/article";
import Link from "next/link";

async function getArticles(params: {
  page: number;
  itemsPerPage: number;
}): Promise<ArticleAPI> {
  const res = await fetch(
    "http://localhost:1000/articles?page=" +
      Number(params.page).toString() +
      "&items_per_page=" +
      params.itemsPerPage.toString(),
    {
      cache: "no-store",
    }
  );
  return res.json();
}

export default async function ArticlePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page =
    typeof searchParams?.page === "string" ? Number(searchParams.page) : 1;
  const itemsPerPage =
    typeof searchParams?.limit === "string" ? Number(searchParams.limit) : 10;

  const articles = await getArticles({ page, itemsPerPage });

  const totalItems =
    articles.success && articles.data ? articles.data.total_items : 0;

  const lowerBound = (page - 1) * itemsPerPage + 1;
  const upperBound = totalItems > 0 ? page * itemsPerPage : 0;

  const articleData =
    articles.success && articles.data ? articles.data.items : [];

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
        {/* Table */}
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
            {articleData.map((article) => {
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

        {/* Pagination */}
        <nav
          className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{lowerBound}</span> to{" "}
              <span className="font-medium">{upperBound}</span> of{" "}
              <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div className="flex-1 flex justify-between sm:justify-end">
            {/* <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </a> */}
            <Link
              href={{
                pathname: "/article",
                query: {
                  page: page > 1 ? page - 1 : 1,
                },
              }}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </Link>
            <Link
              href={{
                pathname: "/article",
                query: {
                  page: page + 1,
                },
              }}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
