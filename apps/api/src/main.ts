import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // ─── Security ────────────────────────────────────────────────────────────
  app.use(helmet())

  // ─── CORS ─────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: [
      process.env['FRONTEND_URL'] ?? 'http://localhost:3000',
      'https://jobsetu.dpdns.org',
      'https://www.jobsetu.dpdns.org',
      'https://jobsetu.in',
    ],
    credentials: true,
  })

  // ─── Global API Prefix ───────────────────────────────────────────────────
  app.setGlobalPrefix('api')

  // ─── Validation Pipe ────────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // Strip unknown properties
      forbidNonWhitelisted: true,
      transform: true,       // Auto-transform query params to proper types
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  const port = process.env['PORT'] ?? 4000
  await app.listen(port)
  console.log(`🌉 JobSetu API running on http://localhost:${port}/api`)
}

bootstrap()
