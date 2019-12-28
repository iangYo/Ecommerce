module.exports = {
    secret: process.end.NODE_ENV === "production" ? process.env.SECRET : "SADF8F7ASFDSDF89ASDF6ASDF4JKUIOUGHJ4K1JKHJKHJ1DFB8CV7BVCB",
    api: process.env.NODE_ENV === "production" ? "https://api.loja-teste.ampliee.com" : "http://localhost:3000",
    loja: process.env.NODE_ENV === "production" ? "https://loja-teste.ampliee.com" : "http://localhost:8000"
};