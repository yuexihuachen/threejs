import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

const app = new Hono()

app.get('/', serveStatic({ root: './' }))
app.get('*', serveStatic({ root: './' }))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
