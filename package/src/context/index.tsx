import { Routes } from '@filante/arcessere/types'
import { CobaltContextProps, CobaltProvider } from './base.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NavigationProgress, nprogress } from '@mantine/nprogress'
import { Notifications } from '@mantine/notifications'
import dynamic from 'next/dynamic.js'
import { useRouter } from 'next/router.js'
import { useEffect } from 'react'
import Head from 'next/head.js'
import { MetaTags } from '../components/meta_tags.js'

const GoogleAnalytics = dynamic(() => import('../components/google_analytics.js'), {
  ssr: false,
})

export const CobaltContext = <ROUTES extends Routes>(props: CobaltContextProps<ROUTES>) => {
  const router = useRouter()

  useEffect(() => {
    const startProgress = () => {
      nprogress.start()
    }

    const completeProgress = () => {
      nprogress.complete()
    }

    router.events.on('routeChangeStart', startProgress)
    router.events.on('routeChangeComplete', completeProgress)
    router.events.on('routeChangeError', completeProgress)

    return () => {
      router.events.off('routeChangeStart', startProgress)
      router.events.off('routeChangeComplete', completeProgress)
      router.events.off('routeChangeError', completeProgress)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <title>{props.config.meta.title}</title>

        <MetaTags {...props.config.meta} />

        <link rel="icon" href={props.config.meta.favicon} />

        {props.config.gtag && <GoogleAnalytics gtag={props.config.gtag} />}
      </Head>

      <CobaltProvider value={{}}>
        <QueryClientProvider client={props.cobalt?.query ?? new QueryClient()}>
          <MantineProvider
          
            theme={props.mantine}
            defaultColorScheme={props.config.theme}
            {...(props.config.forceTheme && {
              forceColorScheme: props.config.theme === 'dark' ? 'dark' : 'light',
            })}
          >
            <ModalsProvider>
              <NavigationProgress size={5} />

              <Notifications />

              {props.children}
            </ModalsProvider>
          </MantineProvider>
        </QueryClientProvider>
      </CobaltProvider>
    </>
  )
}
