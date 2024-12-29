// pages/blog/[slug].tsx

import { client } from "@/sanity/lib/client";
import { useRouter } from "next/router";

interface Blog {
  title: string;
  author: string;
  publishedDate: string;
  categories: string[];
  image: {
    asset: {
      url: string;
    };
  };
  content: any[];
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Fetch the blog post using the slug
  const data = await client.fetch(`
    *[_type == 'blog' && slug.current == $slug][0]{
      title,
      author,
      publishedDate,
      categories,
      "imageUrl": image.asset->url,
      content
    }
  `, { slug });

  // If the post doesn't exist, show a 404 error page
  if (!data) {
    return <div>404 - Post Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-gray-800">Blog Hub</h1>
        </div>
      </header>

      {/* Blog Content */}
      <div className="container mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="w-full h-[30rem] overflow-hidden rounded-lg bg-gray-200">
            <img
              src={data.imageUrl}
              alt={data.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-semibold text-gray-800">{data.title}</h1>
            <p className="text-sm text-gray-600">
              By {data.author} | {new Date(data.publishedDate).toLocaleDateString()}
            </p>
            <div className="mt-4">
              <p className="text-gray-700">{data.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
