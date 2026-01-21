# Music Catalogue

A library of my vinyl collection.

- Add a new record entry
- Search through the collection
- Go on a nostalgia trip

### Tech

- Prisma ORM
- Neon Postgres
- Vite
- Express
- MUI
- React
- Typescript

## Run

From the project root you can start both `Backend` and `Frontend` by running

```bash
npm run dev:all
```

The output will be

```bash
   VITE v7.3.1  ready in 108 ms
[1]
[1]   ➜  Local:   http://localhost:5173/ # <-- Frontend
[1]   ➜  Network: use --host to expose
[0] Server is running on http://localhost:4000 # <-- Backend
```

If you rather run them separate, this is the way

```bash
# Backend server
cd server
npm run dev

# Frontend server
cd .. # root
npm run dev
```

## Prisma ORM

To import and use the Prisma client, import it from the generated folder

```ts
import { PrismaClient } from "../generated/prisma/client";
```

See [prisma schema](server/prisma/schema.prisma)

### Prisma studio

Spin up the Prisma interface by running

```bash
npm run prisma # prisma studio
```

Outcome

```bash
Prisma Studio is up on http://localhost:5555
```

Here you'll see the data table(s).
