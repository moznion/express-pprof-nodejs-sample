# sample project for pprof-nodejs with express (JavaScript)

## Usage

### Launch server

```
$ npm install
$ NODE_ENV=production node ./main.js
```

### Benchmark

```
$ curl -X GET 'http://localhost:8080/newUser?username=matt&password=password'
$ ab -k -c 20 -n 250 'http://localhost:8080/auth?username=matt&password=password'
```

### Analyze the profiling result

```
pprof -http=: wall.pb.gz
```

## References

- https://github.com/google/pprof-nodejs
- https://nodejs.org/ja/docs/guides/simple-profiling/

