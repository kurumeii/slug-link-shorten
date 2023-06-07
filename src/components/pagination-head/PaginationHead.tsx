import { Fragment } from "react"
import { Icons } from "../icons/Icons"
import Link from "next/link"

type Props = {
  pages: Array<{
    url?: string
    title: string
  }>
}

const PaginationHead = ({ pages }: Props) => {
  const page = pages.map(({ title, url }, idx) => {
    const isLastItem = idx === pages.length - 1
    const nextItem = !isLastItem && pages[idx + 1]
    return (
      <Fragment key={idx}>
        {nextItem && (
          <>
            <div className='capitalize'>
              {url ? <Link href={url}>{title}</Link> : <p>{title}</p>}
            </div>
            <Icons.chevronRight className='h-5 w-5' />
            <div className='font-medium capitalize text-foreground'>
              {nextItem.url ? (
                <Link href={nextItem.url}>{nextItem.title}</Link>
              ) : (
                <p>{nextItem.title}</p>
              )}
            </div>
          </>
        )}
      </Fragment>
    )
  })

  return (
    <div className='mb-4 flex items-center space-x-1 text-sm text-muted-foreground'>
      {page}
    </div>
  )
}

export default PaginationHead
