const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/proxy', (req, res) => {
    const target = req.body.url;
    if (!target) {
        return res.status(400).send('URL is required');
    }
    const proxy = createProxyMiddleware({
        target: target,
        changeOrigin: true,
        pathRewrite: { '^/proxy': '' }
    });
    proxy(req, res);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
