import { MediaWatchProviders } from "@/components/media-watch-providers"

interface DetailWatchProps {
  readonly params: {
    readonly id: string
  }
}

export const metadata = {
  title: "Watch",
}

export default function DetailWatch({ params }: DetailWatchProps) {
  return <MediaWatchProviders id={params.id} type="movie" />
}