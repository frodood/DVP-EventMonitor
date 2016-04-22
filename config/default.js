module.exports = {
    "Freeswitch": {
        ip: '127.0.0.1',
        port: 8021,
        password: 'ClueCon',
        httport: 8080
    },

    "DB": {
        "Type":"postgres",
        "User":"duo",
        "Password":"DuoS123",
        "Port":5432,
        "Host":"104.236.231.11",
        "Database":"duo"
    },

    Dialer: {
        ip: '192.168.0.5',
        port: 2223
    },

    ARDS: {
        ip: '127.0.01',
        port: 2225,
        version: '1.0.0.0'
    },

    WebAPI: {

        domain: '192.168.1.58',
        port: 80,
        path: '/CSReqWebApi/api/'
    },

    Redis: {
        ip: '127.0.01',
        port: 6379,
        password: "123"
    },

    Token: "123"
};