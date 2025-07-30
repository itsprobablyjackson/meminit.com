'use client'

import Script from 'next/script'
import { useEffect } from 'react'

type props = { className?: string }

const Skyscraper = ({ className = "" }: props) => {
    return (
        <>
            {/* Load AdSense script */}
            <Script
                id="adsbygoogle"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                strategy="afterInteractive"
                crossOrigin="anonymous"
                onLoad={() => {
                    try {
                        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
                        (window as any).adsbygoogle.push({});
                    } catch (e) {
                        console.error("AdSense push error", e);
                    }
                }}
            />

            <div className={`grow rounded-lg flex flex-col items-center justify-center top-0 ${process.env.NODE_ENV == 'development' ? 'bg-zinc-900' : ''}` + className}>
                <ins className="adsbygoogle"
                    style={{ display: 'block', height: '100%', width: '100%' }}
                    data-ad-client="ca-pub-9758035810696915"
                    data-ad-slot="3084975057"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
            </div>
        </>
    );
}

export default Skyscraper;
