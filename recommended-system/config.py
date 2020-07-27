from decouple import config


class Config:
    pass


class DevelopmentConfig(Config):
    DEBUG = True
    MONGO_USER = config('MONGO_USER')
    MONGO_PASS = config('MONGO_PASS')
    MONGO_URI = 'mongodb+srv://'+MONGO_USER+':' + \
        MONGO_PASS+'@cafe.wbaqo.mongodb.net/LICORES'


class ProductionConfig(Config):
    DEBUG = False
    MONGO_USER = config('MONGO_USER')
    MONGO_PASS = config('MONGO_PASS')
    MONGO_URI = 'mongodb+srv://'+MONGO_USER+':' + \
        MONGO_PASS+'@cafe.wbaqo.mongodb.net/LICORES'


config = {
    'dev': DevelopmentConfig,
    'prod': ProductionConfig
}
