"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_1 = require("../services/Users");
const userRouter = (0, express_1.Router)();
userRouter.post('/api/users/create', Users_1.createUsers);
userRouter.get('/api/users/get', Users_1.getUsers);
exports.default = userRouter;
