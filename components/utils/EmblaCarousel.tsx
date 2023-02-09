import React, { ReactNode, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

export const EmblaCarousel = ({ children }: { children: ReactNode }) => {
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			containScroll: 'keepSnaps'
		},
		[Autoplay()]
	)

	useEffect(() => {
		if (emblaApi) {
			emblaApi.on('select', () => {
				console.log(emblaApi.selectedScrollSnap())
			})
		}
	})

	const scrollTo = (index: number) => {
		if (emblaApi) {
			emblaApi.scrollTo(index)
		}
	}

	const scrollPrev = () => {
		if (emblaApi) {
			emblaApi.scrollPrev()
		}
	}

	const scrollNext = () => {
		if (emblaApi) {
			emblaApi.scrollNext()
		}
	}

	const hasNext = () => {
		if (emblaApi) {
			return emblaApi.canScrollNext()
		}
	}

	const hasPrev = () => {
		if (emblaApi) {
			return emblaApi.canScrollPrev()
		}
	}

	return (
		<>
			{hasPrev() && (
				<button className="embla__button prev" onClick={scrollPrev}>
					<Image
						alt={`Left arrow`}
						src={`https://img.icons8.com/ios-filled/100/null/less-than.png`}
						width={42}
						height={35}
						priority
					/>
				</button>
			)}
			<div className="embla" ref={emblaRef}>
				<div className="embla__container">
					{React.Children.map(children, (child) => {
						return React.cloneElement(child as React.ReactElement, {
							className: 'embla__slide'
						})
					})}
				</div>
			</div>
			{hasNext() && (
				<button className="embla__button next" onClick={scrollNext}>
					<Image
						alt={`Right arrow`}
						src={`https://img.icons8.com/ios-filled/100/null/more-than.png`}
						width={48}
						height={48}
						priority
					/>
				</button>
			)}
		</>
	)
}
