import React from 'react'

export const metadata = {
  title: 'ZAKATYY - Digital Menu',
  description: 'Multilingual Digital Menu Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  )
}
