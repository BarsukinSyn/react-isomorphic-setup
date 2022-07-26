import React, { FC } from 'react'

import { InitialState } from './app'

export const doctype = '<!DOCTYPE html>'

export const documentSeparator = '-~-'

export interface RootProps {
  faviconPath?: string
  jsFilePaths?: string[]
  cssFilePaths?: string[]
  initialAppState?: InitialState
}

export const Root: FC<RootProps> = ({
  faviconPath = '',
  jsFilePaths = [],
  cssFilePaths = [],
  initialAppState = {}
}) => {
  const initialAppStateString = JSON.stringify(initialAppState)
  const initialAppStateScriptTag = (
    <script id='initial-state' data-state-string={initialAppStateString} />
  )
  const faviconLinkTag = faviconPath && (
    <link rel='icon' type='image/x-icon' href={faviconPath} />
  )
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
        {faviconLinkTag}
      </head>
      <body>
        <noscript>You need to enable JavaScript to use this app</noscript>
        <div id='root'>{documentSeparator}</div>
        {initialAppStateScriptTag}
      </body>
    </html>
  )
}
