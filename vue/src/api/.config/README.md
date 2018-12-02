create the following files with at least these attributes

> .db.config.json

```json
{
    "user": "xyz",
    "database": "xyz",
    "password": "xyz",
    "host": "xyz",
    "port": 5432,
    "max": 10,
    "idleTimeoutMillis": 100000
}
```

> .jwt.config.json

```json
{
    "COOKIE": "jwt-cloud-api",
    "SECRET_T": "xyz",
    "SECRET_RT": "xyz",
    "jwt_options_t": {
        "expiresIn": "15m"
    },
    "jwt_options_rt": {
        "expiresIn": "3d"
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
