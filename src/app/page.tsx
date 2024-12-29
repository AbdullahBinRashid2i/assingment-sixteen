import { client } from "@/sanity/lib/client";

interface Blog {
  title: string;
  author: string;
  publishedDate: string;
  categories: string[] | null;
  image: {
    asset: {
      url: string;
    };
  };
  content: any[];
}

export default async function Home() {
  const data = await client.fetch(`*[_type == 'blog']{
    title,
    author,
    publishedDate,
    categories,
    "imageUrl": image.asset->url,
    content
  }`);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-gray-800">Blog Hub</h1>
        </div>
      </header>

      {/* Blog Section */}
      <div className="container mx-auto p-6">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item: Blog, i: number) => (
            <div
              className="border border-gray-200 rounded-lg shadow-sm bg-white p-4 hover:shadow-lg transition duration-300"
              key={i}
            >
              <div className="w-full h-[30rem] overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="mt-4">
                <h1 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h1>
                <p className="text-sm text-gray-600">
                  By {item.author} |{" "}
                  {new Date(item.publishedDate).toLocaleDateString()}
                </p>
                <p className="mt-2 text-gray-700">
                  Categories:{" "}
                  {item.categories?.length
                    ? item.categories.join(", ")
                    : "No categories"}
                </p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
