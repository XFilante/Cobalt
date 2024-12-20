import { Arcessere } from '@filante/arcessere'
import { RouteKeys, Routes } from '@filante/arcessere/types'
import { Imprimer } from '@filante/imprimer'
import { GetServerSidePropsContext } from 'next'

export class CobaltServer<ROUTES extends Routes, SCERK extends RouteKeys<ROUTES>> {
  api: Arcessere<ROUTES>
  routes: ROUTES
  logger: Imprimer

  sessionConfig: {
    cookie: string
    endpoint: SCERK
  }

  secureConfig: {
    redirect: string
  }

  constructor(params: {
    api: Arcessere<ROUTES>
    routes: ROUTES
    logger: Imprimer
    session: {
      /** Cookie name used for session */
      cookie: string
      endpoint: SCERK
    }
    secure: {
      redirect: string
    }
  }) {
    this.api = params.api
    this.routes = params.routes
    this.logger = params.logger

    this.sessionConfig = params.session
    this.secureConfig = params.secure
  }

  session = async (ctx: GetServerSidePropsContext) => {
    const sessionCookie = ctx.req.cookies[this.sessionConfig.cookie]

    if (!sessionCookie) {
      return null
    }

    this.api.setToken(sessionCookie)

    try {
      const res = await this.api.endpoint(this.sessionConfig.endpoint).call(undefined)

      return res ?? null
    } catch (err) {
      return null
    }
  }

  secure = (params?: {
    condition?: (session: ROUTES[SCERK]['io']['output'] | null) => {
      allow: boolean
      redirect: string
    }
  }) => {
    return async (ctx: GetServerSidePropsContext) => {
      const session = await this.session(ctx)

      const condition = params?.condition
        ? params.condition(session)
        : { allow: !session, redirect: this.secureConfig.redirect }

      if (condition.allow) {
        return {
          redirect: {
            destination: condition.redirect,
            permanent: false,
          },
        }
      }

      return { props: {} }
    }
  }
}
