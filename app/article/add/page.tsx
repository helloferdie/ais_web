import { redirect } from "next/navigation";
import SaveButton from "./save";
import { saveArticle } from "@/lib/article";
import { revalidatePath } from "next/cache";

export default function ArticleAddPage() {
  async function saveArticleAction(data: FormData) {
    "use server";

    const submitData = {
      author: data.get("author") as string,
      title: data.get("title") as string,
      body: data.get("body") as string,
    };

    const resp = await saveArticle(submitData);
    if (resp.success) {
      console.log("success");
      //revalidatePath("/articles?page=1&");
      redirect("/article");
    } else {
      console.log(resp);
      console.log("Fail submit");
    }
  }

  return (
    <>
      <form action={saveArticleAction}>
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              Author
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="author"
                id="author"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="title"
                id="title"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700"
            >
              Body
            </label>
            <div className="mt-1">
              <textarea
                id="body"
                name="body"
                rows={3}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="you@example.com"
                defaultValue={""}
              />
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <SaveButton />
          </div>
        </div>
      </form>
    </>
  );
}
