import { UseFormReturnType } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { ArcessereError } from '@filante/arcessere'
import { capitalCase } from 'case-anything'
import { Imprimer } from '@filante/imprimer'

export const ArcessereErrorHandler = (
  logger: Imprimer,
  error: unknown,
  form?: UseFormReturnType<any>
) => {
  if (error instanceof ArcessereError) {
    logger.error({ error, details: error.toJSON() })
  } else {
    logger.error({ error })
  }

  if (error instanceof ArcessereError) {
    switch (error.type) {
      case 'axios': {
        if (error.axios?.response) {
          if (error.axios.response.data.errors) {
            const { errors } = error.axios.response.data as {
              errors: {
                title: string
                code: string
                status?: number
                field?: string
                message?: string
                meta?: object
              }[]
            }

            const formFields = form ? Object.keys(form.getValues()) : []

            logger.info({ formFields, errors })

            for (const errorR of errors) {
              if (form && errorR.field && formFields.includes(errorR.field)) {
                form.setFieldError(errorR.field, errorR.message)
              } else {
                notifications.show({
                  title: errorR.message ? capitalCase(errorR.title) : undefined,
                  message: capitalCase(errorR.message || errorR.title),
                })
              }
            }
          } else {
            notifications.show({
              title: error.message,
              message: "Error array doesn't exist in response data",
            })
          }
        } else {
          notifications.show({
            message: error.message,
          })
        }
        break
      }

      default: {
        notifications.show({
          message: error.message,
        })
        break
      }
    }
  } else {
    notifications.show({
      title: 'Unrecognized Error',
      message: 'An unrecognized error has occurred. Please try again.',
    })
  }
}
