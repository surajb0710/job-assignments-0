function corsMiddleware(req, res, next) {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://persist-ventures-fe.vercel.app'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204); // Or 200
  } else {
    next();
  }
}

export default corsMiddleware;
