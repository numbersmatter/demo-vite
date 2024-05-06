

export default function SectionHeaderDescription({
  header, description
}: {
  header: string,
  description: string
}) {
  return (
    <div className="border-b border-gray-200 pb-5">
      <h1 className="text-4xl font-semibold leading-6 text-gray-900">
        {header}
      </h1>
      <p className="mt-3 max-w-4xl text-base text-gray-500">
        {description}
      </p>
    </div>
  )
}
