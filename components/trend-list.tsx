import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"

import { ListPagination } from "@/components/list-pagination"
import { MovieCard } from "@/components/movie-card"
import { PersonCard } from "@/components/person-card"
import { TvCard } from "@/components/tv-card"

interface TrendListProps {
  type: "movie" | "tv" | "people"
  time: "day" | "week"
  page: string
  title?: string
  description?: string
}

export const TrendList: React.FC<TrendListProps> = async ({
  type,
  time,
  page,
  title,
  description,
}) => {
  const {
    results: trends,
    total_pages: totalPages,
    page: currentPage,
  } = await tmdb.trending[type]({
    time,
    page,
  })

  if (!trends?.length) {
    return notFound()
  }

  function renderTrendItem(item: any) {
    if (item.media_type === "tv") {
      return <TvCard key={item.id} {...item} />
    }
    if (item.media_type === "person") {
      return <PersonCard key={item.id} {...item} />
    }
    return <MovieCard key={item.id} {...item} />
  }

  return (
    <div className="container space-y-8">
      <div className="md:mb-12 md:mt-6">
        <h1 className="mb-2 text-2xl font-medium">{title}</h1>
        <p className="max-w-3xl text-muted-foreground">{description}</p>
      </div>

      <div className="grid-list">
        {trends.map((item) =>
          renderTrendItem(item)
        )}
      </div>

      <ListPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}