// system
import { useRouter } from 'next/router';

// models
import { BreadcrumbItemModel } from '@/src/@core/models/Breadcrumbs/breadcrumbs.model';

interface BreadcrumbAlias {
  [segmentOrPath: string]: string
}

interface UseBreadcrumbsOptions {
  dynamicLabels?: {
    [path: string]: string
  }
}

export function useBreadcrumbs(
  alias: BreadcrumbAlias = {},
  options: UseBreadcrumbsOptions = {}
): BreadcrumbItemModel[] {
  const router = useRouter()
  const queryString = router.asPath.includes('?') ? '?' + router.asPath.split('?')[1] : ''
  const pathSegments = router.asPath.split('?')[0].split('/').filter(Boolean)

  const breadcrumbs: BreadcrumbItemModel[] = []
  const dynamicLabels = options.dynamicLabels || {}

  breadcrumbs.push({
    label: 'Início',
    href: '/',
  })

  let accumulatedPath = ''
  let skipNext = false

  pathSegments.forEach((segment, index) => {
    if (skipNext) {
      skipNext = false
      return
    }

    accumulatedPath += `/${segment}`
    const nextSegment = pathSegments[index + 1]
    const fullNextPath = `${accumulatedPath}/${nextSegment}`

    if (nextSegment && alias[fullNextPath]) {
      breadcrumbs.push({
        label: alias[fullNextPath],
        href: index + 1 !== pathSegments.length - 1 ? fullNextPath : undefined,
      })
      skipNext = true
    } else {
      const fullPathWithQuery = accumulatedPath + queryString
      const label =
        dynamicLabels[fullPathWithQuery] ||
        alias[accumulatedPath] ||
        alias[segment] ||
        segment.replace(/-/g, ' ')

      breadcrumbs.push({
        label,
        href: index !== pathSegments.length - 1 ? accumulatedPath : undefined,
      })
    }
  })

  return breadcrumbs
}
