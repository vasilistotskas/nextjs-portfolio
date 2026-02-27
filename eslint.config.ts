import tseslint from 'typescript-eslint'
import nextConfig from 'eslint-config-next'

const config = tseslint.config(
	{ ignores: ['public/**', '.next/**', 'node_modules/**'] },
	...nextConfig,
	...tseslint.configs.recommended,
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }]
		}
	}
)

export default config
