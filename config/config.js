const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    "mongodb://mern-skeleton-pub-usr1:r57y3yAFmkRS8G@ds361968.mlab.com:61968/mern-skeleton-cbox-public"
  /*
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    //'mongodb://' + (process.env.IP || 'localhost') + ':' +
    // zz20191207-1809+0100
    'mongoUrl: "mongodb://cbox-coursera-backend:yTq5#Q$7S24M*%@ds251902.mlab.com:51902/hihimongotest' +
      (process.env.MONGO_PORT || "27017") +
      "/mernproject"
      */
};

export default config;
