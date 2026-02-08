# GrammoFon - A Music Catalogue

### My vinyl collection

**Author:** Tele Caster Nilsen<br/>
**Website:** ...

---

#### What does this app do?

- Add a new record entry
- Search through the record collection
- Add albums to wishlist
- Go on a nostalgia trip

---

**Table of contents:**

1. [Technologies](#tech)
2. [Run](#run)
3. [Prisma ORM](#prisma-orm)
   - [Create](#create-new-table)
   - [Update](#updating-existing-tables)
   - [Drop](#dropping-tables)
4. [Contact](#contact)

---

### Tech

- Prisma ORM
- Neon Postgres
- Vite
- Node.js/Express
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

### Creating and scaling

#### Create new table

Create a new model in [schema](./server/prisma/schema.prisma) and migrate it to the database by running

```bash
cd server
npx prisma migrate dev --name add-newtablename
```

If a new endpoint is created, configure a proxy for it in [vite.config](vite.config.ts) so it's forwarded to the backend URL.

#### Updating existing tables

After you've made the adjustments in the table(s) in [schema](./server/prisma/schema.prisma), run the following to sync your changes:

```bash
cd server
npx prisma generate
```

#### Dropping tables

To remove models, tables and deleting the data, do the following:

1. Delete the model in [schema](./server/prisma/schema.prisma)
2. Run:

```bash
npx prisma migrate dev --name drop-tablename
```

**!NOTE!** The data will then be permanently deleted.

---

### Contact

**WEBMAIL:** [telecasternilsen.com](https://telecasternilsen.com/#contact)<br/>
**LINKEDIN:** [telecasternilsen](https://www.linkedin.com/in/tele-caster-nilsen-7002b9249)<br/>
