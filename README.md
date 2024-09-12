# Earthquakes Near Me Fullstack Application

This is a fullstack application that shows the latest earthquakes near the user's location. 
The application is built using the following technologies:

- Backend: NestJS with TypeORM or Prisma
- Frontend (Web): React with Next.js
- Mobile: React Native or Flutter

## Features

- Show the latest earthquakes near the user's location
- Cache the earthquakes data on the user's device

```
my-fullstack-app/
├── backend/
│   ├── src/
│   │   ├── earthquake.module.ts
│   │   ├── main.ts
│   │   ├── modules/
│   │   │   ├── users/
│   │   │   │   ├── users.controller.ts
│   │   │   │   ├── users.module.ts
│   │   │   │   ├── users.service.ts
│   │   │   │   ├── dto/
│   │   │   │   │   ├── create-user.dto.ts
│   │   │   │   │   ├── update-user.dto.ts
│   │   │   │   ├── entities/
│   │   │   │   │   ├── user.entity.ts
│   ├── test/
│   │   ├── earthquake.e2e.spec.ts
│   │   ├── jest-e2e.json
│   ├── nest-cli.json
│   ├── tsconfig.build.json
│   ├── tsconfig.json
│   ├── package.json
│   ├── jest.config.js
│   ├── .eslintrc.js
│   ├── .prettierrc
├── frontend/
│   ├── pages/
│   │   ├── index.tsx
│   │   ├── _app.tsx
│   │   ├── api/
│   │   │   ├── hello.ts
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   ├── public/
│   │   ├── favicon.ico
│   ├── styles/
│   │   ├── globals.css
│   ├── tsconfig.json
│   ├── package.json
│   ├── next.config.js
│   ├── .eslintrc.js
│   ├── .prettierrc
├── mobile/
│   ├── react-native-app/
│   │   ├── App.tsx
│   │   ├── components/
│   │   ├── screens/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   ├── flutter-app/
│   │   ├── lib/
│   │   │   ├── main.dart
│   │   ├── pubspec.yaml
├── docker-compose.yml
├── README.md
```
