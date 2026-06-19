interface NavPlaceholderPageProps {
  title: string
  description: string
}

export function NavPlaceholderPage({
  title,
  description,
}: NavPlaceholderPageProps) {
  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      </div>
    </div>
  )
}
