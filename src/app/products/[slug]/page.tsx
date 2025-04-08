import { IndividualProuductComponent } from "@/components/IndividualProductComponent";
import { type Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // read route params
  const { slug } = await params;
  let title =
    slug.split("-")[0][0].toUpperCase() + slug.split("-")[0].substring(1);
  title +=
    " " + slug.split("-")[1][0].toUpperCase() + slug.split("-")[1].substring(1);

  // fetch data

  return {
    title,
  };
}

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return <IndividualProuductComponent slug={slug} />;
};

export default SingleProductPage;
