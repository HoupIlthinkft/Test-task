# TaskManager

## Стек: 
#### Основной: React, TypeScript, HTML5, CSS3, Tailwind
###### Вторичный: Flatpickr, Jest, react-testing-library, vitest


## Запуск проекта

**Подготовительный этап**:
Установить следующие программы, для работоспособности:
- **macOS / Linux**: `git`, `docker` (или `docker-engine`) и `docker-compose` (или Docker Desktop).
- **Windows**: Docker Desktop (рекомендуется) или Docker Engine + Docker Compose, и `git`.

**Запуск**

1. Клонируйте репозиторий и перейдите в папку проекта:

```bash
git clone https://github.com/HoupIlthinkft/TaskManager.git
cd TaskManager
```

2. Убедитесь, что Docker (или Docker Desktop) запущен.

3. Поднимите сервис:

```bash
docker-compose up --build
```

4. После старта сервиса:
- Фронтенд будет доступен по http://localhost:8080/

5. Остановка и удаление контейнеров:

```bash
docker-compose down
```
