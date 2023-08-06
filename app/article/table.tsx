import { getArticles } from "@/lib/article";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { DeleteArticleButton } from "./button";

export default async function ArticleTable(props: {
  page: number;
  limit: number;
}) {
  const { page, limit } = props;
  const articles = await getArticles({ page, limit });

  const totalItems =
    articles.success && articles.data ? articles.data.total_items : 0;

  const lowerBound = (page - 1) * limit + 1;
  const upperBound = totalItems > 0 ? page * limit : 0;

  const articleData =
    articles.success && articles.data ? articles.data.items : [];

  return (
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
              ID
            </th>
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
                  {article.id}
                </td>
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
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </a>

                  <DeleteArticleButton
                    id={article.id}
                    page={page}
                    limit={limit}
                  />
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
  );
}
