import { A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { NEWS } from "@/modules/home/consts/home.constants";
import { formatDate } from "@/shared/utils/format.utils";

export const LatestNews = () => (
  <section aria-labelledby="news-title" className="mx-4 my-24 sm:mx-10">
    <h2 id="news-title" className="text-4xl font-medium text-navy">
      Latest <span className="text-brand">News</span>
    </h2>
    <p className="mt-2 text-slate-500">Get updated with the latest news of new technologies and gadgets.</p>
    <Swiper
      modules={[Pagination, A11y]}
      pagination={{ clickable: true }}
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{ 768: { slidesPerView: 2, spaceBetween: 30 }, 1024: { slidesPerView: 3, spaceBetween: 30 } }}
      className="mt-10 !pb-12"
    >
      {NEWS.map((article) => (
        <SwiperSlide key={article.id}>
          <article>
            <img
              src={article.image}
              alt=""
              loading="lazy"
              width={400}
              height={213}
              className="aspect-[15/8] w-full rounded-3xl object-cover"
            />
            <h3 className="mt-5 text-xl font-bold text-navy">{article.title}</h3>
            <time dateTime={article.date} className="text-sm text-brand">
              {formatDate(article.date)}
            </time>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);
