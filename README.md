# sample project for pprof-nodejs with express

## Usage

### Launch server

```
$ NODE_ENV=production node ./main.js
```

### Benchmark

```
$ curl -X GET 'http://localhost:8080/newUser?username=matt&password=password'
$ ab -k -c 20 -n 250 'http://localhost:8080/auth?username=matt&password=password'
```

### Analyze the profiling result

```
# download pprof
$ go get -u github.com/google/pprof

# view result
$ pprof -http=: wall.pb.gz
# or ~/go/bin/pprof -http=: wall.pb.gz
```

## References

- https://github.com/google/pprof-nodejs
- https://nodejs.org/ja/docs/guides/simple-profiling/

