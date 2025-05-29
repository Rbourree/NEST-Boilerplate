# NEST-Boilerplate
![alt text](https://miro.medium.com/v2/resize:fit:720/format:webp/1*gSPwd3lFDhp0HSGKkEYZTA.png)

A professional starter for your NestJS projects, inspired by Clean Architecture and Domain-Driven Design (DDD).


## Prerequisites

- **Node.js**: >= 18.x (recommended: latest LTS)
- **npm**: >= 9.x (or **yarn**/pnpm)
- **TypeScript**: >= 5.x
- **NestJS CLI**: >= 10.x (`npm i -g @nestjs/cli`)
- **Prisma CLI**: >= 5.x (`npm i -g prisma`)
- **Docker**: for local database (optional but recommended)

## Project Structure
![alt text](https://miro.medium.com/v2/resize:fit:720/format:webp/0*iXidWCYCHTZlxXQp.png)

- **/src/core/** : Domain & Application logic (entities, value objects, interfaces, use-cases)
- **/src/infrastructure/** : Data access (Prisma repositories, mappers, technical services)
- **/src/presentation/** : REST API (controllers, NestJS modules)
- **/src/common/** : Shared services (auth, security, helpers)

## Main Features
- JWT & Bcrypt authentication
- User and article management
- Strong entity validation (Zod)
- Clear separation of concerns
- Ready for unit and integration testing

## Quick Start

```bash
# Install dependencies
npm install

# Start the database (if needed)
docker-compose up -d

# Create .env
cp .env.template .env

# Generate Prisma client
npx prisma generate

# Start the application in development mode
npm run start:dev
```

## Useful Scripts
- `npm run start:dev` : Start in development mode
- `npm run test` : Run unit tests
- `npm run test:e2e` : Run end-to-end tests
- `npx prisma migrate dev` : Apply Prisma migrations

## Best Practices
- Clean Architecture principles
- Systematic data validation
- Dependency injection
- Well-documented and commented code

## Author
Romain Bourrée

---

> This project is designed to be a solid foundation for any professional NestJS application.
