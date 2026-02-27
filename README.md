# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


# Команды для фонового режима || Требуется глобальная установка на сервере 
# если на сервере он не установлен  
npm install -g pm2 


.env - не забыть про порт
# Запуск
pm2 start "npm run dev" --name nuxt-dev
pm2 start "npm run dev" --name nuxt-dev2
pm2 start ecosystem.config.cjs

pm2 list
om2 kill
pm stop <id>
pm delete <id>

# Остановка
pm2 stop nuxt-dev

# Перезапуск
pm2 restart nuxt-dev

# Список процессов
pm2 list

# Логи
pm2 logs nuxt-dev