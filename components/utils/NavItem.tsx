import { useRouter } from 'next/router'
import NextLink from 'next/link'
import cn from 'classnames'
import React from 'react'

function NavItem({ href, text, ariaLabel }) {
	const router = useRouter()
	const isActive = router.asPath === href

	return (
		<NextLink href={href} aria-label={ariaLabel}>
			<p
				className={cn(
					isActive
						? 'font-semibold text-gray-800 dark:text-gray-200'
						: 'font-normal text-gray-600 dark:text-gray-400',
					'hidden rounded-lg p-1 transition-all hover:bg-gray-200 dark:hover:bg-gray-800 sm:px-3 sm:py-2 md:inline-block'
				)}
			>
				<span className="capsize">{text}</span>
			</p>
		</NextLink>
	)
}

export default NavItem
