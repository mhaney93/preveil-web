import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import AddToCartButton from "@/components/AddToCartButton";
import ProductImages from "@/components/ProductImages";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Image gallery */}
        <ProductImages images={product.images ?? []} name={product.name} />

        {/* Details */}
        <div className="flex flex-col justify-center">
          {product.category && (
            <p className="text-sm tracking-widest uppercase text-[var(--muted)] mb-3">
              {product.category}
            </p>
          )}
          <h1 className="font-[family-name:var(--font-heading)] text-4xl font-light tracking-wide text-[var(--foreground)] mb-4">
            {product.name}
          </h1>
          <p className="text-[var(--accent-gold)] tracking-wide mb-6">
            From ${product.price_from.toFixed(2)}
          </p>
          {product.description && (
            <p className="text-[var(--muted)] leading-relaxed mb-8">
              {product.description}
            </p>
          )}

          {variants.length > 0 && (
            <AddToCartButton product={product} variants={variants} />
          )}
        </div>
      </div>
    </div>
  );
}
