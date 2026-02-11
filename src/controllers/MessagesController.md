# MessagesController

## Назначение
`MessagesController` управляет WebSocket‑соединением для сообщений:
- открывает/закрывает соединение для активного чата;
- отправляет сообщения;
- принимает сообщения и историю;
- синхронизирует данные со Store;
- поддерживает ping.

## Зависимости
- `MessagesApi` — низкоуровневое управление WebSocket.
- `Store` — хранит сообщения и маркеры обновления.

## Жизненный цикл
1. `connect({ userId, chatId, token })`
   - закрывает предыдущий сокет;
   - открывает новый `WebSocket`;
   - навешивает события (`open`, `message`, `close`, `error`).
2. `disconnect()`
   - останавливает ping;
   - закрывает сокет.

## События WebSocket
- `open`
  - отправляет `{ type: 'get old', content: '0' }`;
  - запускает `ping`.
- `message`
  - если массив — это история сообщений;
  - если объект с `type: 'message'` — добавляется в список.
- `close`
  - остановка `ping`.
- `error`
  - логирование.

## Store
Хранит сообщения по чатам:

```ts
messages: {
  [chatId: number]: Message[]
}
```

Дополнительно выставляется маркер:

```ts
messagesUpdatedAt: number
```

Он используется для обновления списка чатов (`last_message`, `unread_count`).

## Отправка сообщения

```ts
messagesController.sendMessage(content);
```

Проверяется, что сокет открыт (`readyState === OPEN`).

## Подключение к чату
Подключение инициируется при смене активного чата:
- `ChatsController.setActiveChat` → `_connectToChat` → `MessagesController.connect`.

## Ping
Отправляется каждые 10 секунд:
```ts
{ type: 'ping' }
```

Интервал задаётся в `PING_INTERVAL_MS`.
