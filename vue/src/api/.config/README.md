create the following files with at least these attributes

> .db.config.json

```json
{
    "user": "root",
    "database": "cloud",
    "password": "root",
    "host": "127.0.0.1",
    "port": 5432,
    "max": 10,
    "idleTimeoutMillis": 100000
}
```

> .jwt.config.json

```json
{
    "SECRET_T": "123456789",
    "SECRET_RT": "987654321",
    "jwt_options_t": {
        "expiresIn": "15m"
    },
    "jwt_options_rt": {
        "expiresIn": "7d"
    },
    "jwt_verify_options": {}
}
```

> .mail.config.json

```json
{
    "host": "mail.xyz.de",
    "port": 587,
    "requireTLS": true,
    "secure": false,
    "auth": {
        "user": "no-reply@xyz.de",
        "pass": "xyz"
    },
    "tls": {
        "rejectUnauthorized": false
    }
}
```
