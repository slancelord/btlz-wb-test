# WB Tariffs Service

## Описание

Сервис выполняет две основные задачи:

1. **Регулярное получение тарифов Wildberries**  
   - Запрашивает тарифы коробов через API WB: `https://common-api.wildberries.ru/api/v1/tariffs/box`.  
   - Сохраняет их в PostgreSQL для каждого дня.  
   - В течение дня данные обновляются, если приходят новые значения.

2. **Обновление данных в Google Sheets**  
   - Берёт актуальные тарифы из базы данных.  
   - Обновляет произвольное количество Google-таблиц по их идентификаторам.  
   - Данные сортируются по возрастанию коэффициента.  

## Настройка

1. Скопируйте файл `.env.example` в `.env` и заполните необходимые значения:

```env
POSTGRES_PORT=5432
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
GOOGLE_SHEET_RANGE=stocks_coefs!A1
APP_PORT=5000
WB_API_KEY=<ваш_ключ>
```

2. Разместите файл google-service-account.json в корневой директории проекта.
   
Это ключ сервисного аккаунта Google, который нужен для доступа к Google Sheets API. 

## Запуск

Приложение запускается в Docker и готово к использованию одной командой:

```bash
docker compose up --build
```
После запуска сервис будет автоматически:

- Запрашивать тарифы Wildberries каждый час.
- Сохранять их в базе данных.
- Обновлять указанные Google Sheets.
