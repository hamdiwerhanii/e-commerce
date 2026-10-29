import { CategoryShowcase } from "@/modules/home/components/CategoryShowcase";
import { FeaturedProducts } from "@/modules/home/components/FeaturedProducts";
import { HeroSlider } from "@/modules/home/components/HeroSlider";
import { LatestNews } from "@/modules/home/components/LatestNews";
import { PromoBanners } from "@/modules/home/components/PromoBanners";
import { useDocumentTitle } from "@/shared/hooks";

export const HomeRoot = () => {
  useDocumentTitle();

  return (
    <>
      <HeroSlider />
      <CategoryShowcase />
      <PromoBanners />
      <FeaturedProducts />
      <LatestNews />
    </>
  );
};
