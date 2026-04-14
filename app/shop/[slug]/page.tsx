import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import ProductClient from "@/components/ProductClient";

export async function generateMetadata(props: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const supabase = await createServerClient();
  const { data: product } = await supabase
    .from("products")
    .select("name, description")
    .eq("slug", slug)
    .single();

  if (!product) return {};

  return {
    title: product.name,
    description: product.description ?? `Shop ${product.name} from Preveil.`,
  };
}

export default async function ProductPage(props: PageProps<"/shop/[slug]">) {
  const { slug } = await props.params;
  const supabase = await createServerClient();

  const { data: product } = await supabase
    .from("products")
    .select("*, product_variants(*)")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!product) notFound();

  const variants = product.product_variants ?? [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <ProductClient product={product} variants={variants} />
    </div>
  );
}
