const express = require('express');
const cache = require('memory-cache');

const app = express();
const cacheExpirationTime = 60000; // 1 minute
function cachingMiddleware(req, res, next) {
  const key = req.originalUrl || req.url; 
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    res.send(cachedResponse);
  } else {
    const originalSend = res.send;
    res.send = (body) => {
      cache.put(key, body, cacheExpirationTime);
      originalSend.call(res, body);
    };
    next();
  }
}
app.use(cachingMiddleware);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
