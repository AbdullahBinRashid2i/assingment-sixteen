import { client } from "@/sanity/lib/client";
import { useRouter } from "next/router";

interface Blog {
  title: string;
  author: string;
  publishedDate: string;
  categories: string[];
  content: any[];
  image: {
    asset: {
      url: string;
    };
  };
}

const BlogPost = ({ blog }: { blog: Blog }) => {
  const { title, author, publishedDate, categories, content, image } = blog;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-lg">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <article>
          <div className="w-full h-[30rem] overflow-hidden rounded-lg bg-gray-200">
            <img
              src={image.asset.url}
              alt={title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              By {author} |{" "}
              {new Date(publishedDate).toLocaleDateString()}
            </p>
            <div className="mt-4 text-gray-700">
              <p>{content}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

// Fetch the data for a specific blog post based on the slug
export async function getServerSideProps({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = await client.fetch(
    `*[_type == 'blog' && slug.current == $slug][0]{
      title,
      author,
      publishedDate,
      categories,
      content,
      image
    }`,
    { slug }
  );

  return {
    props: {
      blog: data,
    },
  };
}

export default BlogPost;
