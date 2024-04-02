### Websocket

#### Todo module:

Connect using the following URI:
```
ws://$APP_URL/ws/todo
```
Everytime a 'todo' gets updated/created the following message will be broadcasted:

```json
{
  "type": "CREATE | UPDATE",
  "payload": {
    "body": "DESCRIPTION",
    "completed": false,
    "completedAt": null,
    "createdAt": "2024-04-02T05:59:57.978Z",
    "updatedAt": "2024-04-02T05:59:57.978Z",
    "_id": "660b9edddcb7a0696d3b9ff4"
  }
}
```
