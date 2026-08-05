/* eslint-disable */
// @ts-nocheck
import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as AboutRouteImport } from './routes/about'
import { Route as ContactRouteImport } from './routes/contact'
import { Route as ProjectsRouteImport } from './routes/projects'
import { Route as ProjectsIndexRouteImport } from './routes/projects.index'
import { Route as ProjectsIdRouteImport } from './routes/projects.$id'

const IndexRoute = IndexRouteImport.update({
  id: '/', path: '/', getParentRoute: () => rootRouteImport,
} as any)
const AboutRoute = AboutRouteImport.update({
  id: '/about', path: '/about', getParentRoute: () => rootRouteImport,
} as any)
const ContactRoute = ContactRouteImport.update({
  id: '/contact', path: '/contact', getParentRoute: () => rootRouteImport,
} as any)
const ProjectsRoute = ProjectsRouteImport.update({
  id: '/projects', path: '/projects', getParentRoute: () => rootRouteImport,
} as any)
const ProjectsIndexRoute = ProjectsIndexRouteImport.update({
  id: '/', path: '/', getParentRoute: () => ProjectsRoute,
} as any)
const ProjectsIdRoute = ProjectsIdRouteImport.update({
  id: '/$id', path: '/$id', getParentRoute: () => ProjectsRoute,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/contact': typeof ContactRoute
  '/projects': typeof ProjectsRouteWithChildren
  '/projects/$id': typeof ProjectsIdRoute
  '/projects/': typeof ProjectsIndexRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/contact': typeof ContactRoute
  '/projects/$id': typeof ProjectsIdRoute
  '/projects': typeof ProjectsIndexRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/contact': typeof ContactRoute
  '/projects': typeof ProjectsRouteWithChildren
  '/projects/$id': typeof ProjectsIdRoute
  '/projects/': typeof ProjectsIndexRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/about' | '/contact' | '/projects' | '/projects/$id' | '/projects/'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/contact' | '/projects/$id' | '/projects'
  id: '__root__' | '/' | '/about' | '/contact' | '/projects' | '/projects/$id' | '/projects/'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  ContactRoute: typeof ContactRoute
  ProjectsRoute: typeof ProjectsRouteWithChildren
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': { id: '/'; path: '/'; fullPath: '/'; preLoaderRoute: typeof IndexRouteImport; parentRoute: typeof rootRouteImport }
    '/about': { id: '/about'; path: '/about'; fullPath: '/about'; preLoaderRoute: typeof AboutRouteImport; parentRoute: typeof rootRouteImport }
    '/contact': { id: '/contact'; path: '/contact'; fullPath: '/contact'; preLoaderRoute: typeof ContactRouteImport; parentRoute: typeof rootRouteImport }
    '/projects': { id: '/projects'; path: '/projects'; fullPath: '/projects'; preLoaderRoute: typeof ProjectsRouteImport; parentRoute: typeof rootRouteImport }
    '/projects/': { id: '/projects/'; path: '/'; fullPath: '/projects/'; preLoaderRoute: typeof ProjectsIndexRouteImport; parentRoute: typeof ProjectsRoute }
    '/projects/$id': { id: '/projects/$id'; path: '/$id'; fullPath: '/projects/$id'; preLoaderRoute: typeof ProjectsIdRouteImport; parentRoute: typeof ProjectsRoute }
  }
}

interface ProjectsRouteChildren {
  ProjectsIdRoute: typeof ProjectsIdRoute
  ProjectsIndexRoute: typeof ProjectsIndexRoute
}
const ProjectsRouteChildren: ProjectsRouteChildren = {
  ProjectsIdRoute: ProjectsIdRoute,
  ProjectsIndexRoute: ProjectsIndexRoute,
}
const ProjectsRouteWithChildren = ProjectsRoute._addFileChildren(ProjectsRouteChildren)

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  ContactRoute: ContactRoute,
  ProjectsRoute: ProjectsRouteWithChildren,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

import type { getRouter } from './router.tsx'
import type { createStart } from '@tanstack/react-start'
declare module '@tanstack/react-start' {
  interface Register {
    ssr: true
    router: Awaited<ReturnType<typeof getRouter>>
  }
}
