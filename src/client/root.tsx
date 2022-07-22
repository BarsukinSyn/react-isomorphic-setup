import React, { FC } from 'react'

export const doctype = '<!DOCTYPE html>'

export const documentSeparator = '-~-'

export interface RootProps {
  jsFilePaths?: string[]
  cssFilePaths?: string[]
}

export const Root: FC<RootProps> = ({
  jsFilePaths = [],
  cssFilePaths = []
}) => {
  const externalScriptTagList = jsFilePaths.map((src, i) => (
    <script defer src={src} key={i} />
  ))
  const styleSheetLinkTagList = cssFilePaths.map((href, i) => (
    <link rel='stylesheet' href={href} key={i} />
  ))

  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>React Isomorphic App</title>
        {externalScriptTagList}
        {styleSheetLinkTagList}
      </head>
      <body>
        <noscript>You need to enable JavaScript to use this app</noscript>
        <div id='root'>{documentSeparator}</div>
      </body>
    </html>
  )
}
