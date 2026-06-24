import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import { engine } from 'express-handlebars';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main', layoutsDir: join(__dirname, '..', 'views', 'layouts') }));
  app.setViewEngine('hbs');

  app.use(
    session({
      secret: 'ecommerce-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription('Simple e-commerce backend built with NestJS')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
