import ArticleTable from "./table";
import Link from "next/link";

export default function ArticlePage({
  searchParams,
}: {
  searchParams?: { page?: string; limit?: string };
}) {
  const page = searchParams?.page ? Number(searchParams.page) : 1;
  const limit = searchParams?.limit ? Number(searchParams.limit) : 10;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Articles</h1>
          <p className="mt-2 text-sm text-gray-700">List of articles</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/article/add"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add article
          </Link>
        </div>
      </div>

      <ArticleTable page={page} limit={limit} />
    </div>
  );
}
