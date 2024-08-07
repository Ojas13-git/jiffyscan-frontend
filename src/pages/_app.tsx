import React from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ConfigProvider } from '@/context/config';
import { Analytics } from '@vercel/analytics/react';
import '../styles/main.sass';
import ReactGA from 'react-ga4';
import { SessionProvider } from 'next-auth/react';
import HeapAnalytics from '@/components/global/HeapAnalytics';
import UserSessionStore from '@/context/userSession';
import NameServiceStore from '@/context/nameServiceContext';
import PHProvider from '@/context/postHogProvider';
import { useTokenPrices } from '@/hooks/useTokenPrices';
import TopBanner from '@/components/global/navbar/TopBanner';
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const TRACKING_ID = 'G-8HQ9S4Z1YF';
ReactGA.initialize(TRACKING_ID);

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    useTokenPrices();
    const getLayout = Component.getLayout ?? ((page) => page);
    return (
        <div>
            <PHProvider>
                <SessionProvider session={session}>
                    <UserSessionStore>
                        <NameServiceStore>
                            <ConfigProvider>{getLayout(<div><TopBanner/><Component {...pageProps} /></div>)}</ConfigProvider>
                            <HeapAnalytics />
                        </NameServiceStore>
                    </UserSessionStore>
                </SessionProvider>
                <Analytics />
            </PHProvider>
        </div>
    );
}
