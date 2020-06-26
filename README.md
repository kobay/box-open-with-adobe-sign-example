# usage

- download config.json
- make .env file 
```
printf "config=%s"  "$(cat config.json | tr -d '\n')" > .env
```
- 
