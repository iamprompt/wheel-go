import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

const WHEEL_GO_ACCEPTED_LANGUAGES = ['th', 'en']

export const ActiveLang = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const reqLang = ctx
      .getContext()
      .req.headers['x-wheel-go-language']?.toString()

    const isSupportedLang = WHEEL_GO_ACCEPTED_LANGUAGES.includes(reqLang)

    return isSupportedLang ? reqLang : 'th'
  },
)
