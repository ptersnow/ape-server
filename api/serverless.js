"use strict";

// Read the .env file.
import * as dotenv from "dotenv";
dotenv.config();

// Require the framework
import Fastify from "fastify";
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

app.register(cors, {
    origin: true
});

app.register(jwt, {
    secret: 'ape-safari-urbano'
});

// Register your application as a normal plugin.
app.register(import("../src/routes/answers"));
app.register(import("../src/routes/auth"));
app.register(import("../src/routes/categories"));
app.register(import("../src/routes/questions"));
app.register(import("../src/routes/sidewalks"));
app.register(import("../src/routes/users"));

export default async (req, res) => {
    await app.ready();
    app.server.emit('request', req, res);
}