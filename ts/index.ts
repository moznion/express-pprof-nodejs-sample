import * as crypto from "crypto";
import express from 'express';
import * as pprof from 'pprof';
import * as fs from "fs";

// original code came from https://nodejs.org/en/docs/guides/simple-profiling/

async function prof() {
  console.log("start to profile >>>");
  const profile = await pprof.time.profile({
    durationMillis: 15000,
  });

  const buf = await pprof.encode(profile);
  fs.writeFile('wall.pb.gz', buf, (err) => {
    if (err) {
      throw err;
    }
  });
  console.log("<<< finished to profile");
}

const users = {};

const app = express();

app.get('/newUser', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.sendStatus(400);
  }

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || users[username]) {
    return res.sendStatus(400);
  }

  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');

  users[username] = {salt, hash};

  return res.sendStatus(200);
});

app.get('/auth', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.sendStatus(400);
  }

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || !users[username]) {
    return res.sendStatus(400);
  }

  const {salt, hash} = users[username];
  const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');

  if (!crypto.timingSafeEqual(hash, encryptHash)) {
    return res.sendStatus(401);
  }
  return res.sendStatus(200);
});

prof();

const server = app.listen(8080, () => {
  const addr = server.address();
  if (addr == null || typeof addr === "string") {
    console.error('failed to listen http');
    return;
  }
  console.log('under listening: http://%s:%s', addr.address, addr.port);
});
