# NEST-Boilerplate

![alt text](https://miro.medium.com/v2/resize:fit:720/format:webp/1*gSPwd3lFDhp0HSGKkEYZTA.png)

A robust, modular, and scalable NestJS boilerplate following Clean Architecture and Domain-Driven Design (DDD) principles.

## Features
- **Clean Architecture**: Clear separation between core domain, infrastructure, and presentation layers.
- **Domain-Driven Design**: Rich domain models, value objects, and use cases.
- **Centralized Error Handling**: Global exception filter for consistent error responses.
- **DTO Validation**: Strong input validation using DTOs and class-validator.
- **Repository Pattern**: Infrastructure repositories decoupled from domain logic.
- **Dependency Injection**: All dependencies managed via NestJS modules and providers.
- **Testability**: Structure designed for easy unit and integration testing.

## Project Structure
![alt text](https://miro.medium.com/v2/resize:fit:720/format:webp/0*iXidWCYCHTZlxXQp.png)

```
src/
  common/         # Shared services, guards, filters
  core/           # Domain entities, value objects, use cases, interfaces
  infrastructure/ # Repositories, external services
  presentation/   # Controllers, modules, DTOs
```

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Configure environment**
   - Copy `.env.example` to `.env` and set your environment variables (DB, JWT, etc).
3. **Run the application**
   ```bash
   npm run start:dev
   ```

## Example Use Case
```typescript
// src/core/users/use-cases/signin.use-case.ts
const result = await signInUseCase.execute(email, password);
```

## API Endpoints
### Users

#### Auth

| Method | Endpoint                  | Description                |
|--------|---------------------------|----------------------------|
| POST   | `/auth/signup`            | Register a new user        |
| POST   | `/auth/signin`            | Authenticate a user        |

#### Users
| Method | Endpoint                  | Description                |
|--------|---------------------------|----------------------------|
| GET    | `/user/me`                | Get current user profile   |
| GET    | `/users`                  | Get alls users profile     |
| GET    | `/user/:id_user`          | Get profile user by ID     |
| PATCH  | `/user/:id_user`          | Patch profile user data    |
| DELETE | `/user/:id_user`          | Delete user                |

#### Articles
| Method | Endpoint                  | Description                |
|--------|---------------------------|----------------------------|
| POST   | `/article`                | Create new article         |
| GET    | `/articles`               | Get alls articles          |
| GET    | `/article/:id_article`    | Get article by ID          |
| PATCH  | `/article/:id_article`    | Patch article data         |
| DELETE | `/article/:id_article`    | Delete article             |




## Testing
```bash
npm run test
```

## Principles
- **Framework-agnostic core**: No NestJS decorators in domain/use cases.
- **Explicit mapping**: Mappers handle conversion between persistence and domain.
- **Flat API responses**: Entities expose only primitives in API responses.

## Contributing
Feel free to open issues or submit pull requests to improve this boilerplate!

---
**Author:** Romain Bourrée
