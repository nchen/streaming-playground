const fastify = require('fastify')({ logger: true })
const path = require('path')
const fs = require('fs')

// 服务静态 HTML
fastify.get('/', async (request, reply) => {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')
  return reply.type('text/html').send(html)
})

// SSE 端点
fastify.get('/events', async (request, reply) => {
  reply.raw.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })

  const interval = setInterval(() => {
    const data = {
      time: new Date().toISOString(),
      value: Math.random()
    }
    reply.raw.write(`data: ${JSON.stringify(data)}\n\n`)
  }, 1000)

  request.raw.on('close', () => {
    clearInterval(interval)
  })
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()