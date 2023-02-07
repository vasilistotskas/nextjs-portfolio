import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '@lib/sanity/sanity.api'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const imageBuilderOptions = {
	projectId: projectId ?? '',
	dataset: dataset ?? ''
}

const imageBuilder = createImageUrlBuilder(imageBuilderOptions)

export const urlForImage = (source: SanityImageSource) =>
	imageBuilder.image(source).auto('format').fit('max')
