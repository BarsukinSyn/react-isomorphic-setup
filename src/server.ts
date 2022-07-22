import polka from 'polka'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT ?? 8000

polka()
  .get('/', (_, res) => res.end('Hello, World!'))
  .listen(PORT, () => console.info('> Server is listening on port', PORT))
