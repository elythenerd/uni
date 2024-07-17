"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TeachersSubjects_1 = require("../services/TeachersSubjects");
const teachersSubjectsRouter = (0, express_1.Router)();
teachersSubjectsRouter.post('/api/ts/create', TeachersSubjects_1.createTeachersSubject);
teachersSubjectsRouter.get('/api/ts/get', TeachersSubjects_1.getTeachersSubject);
exports.default = teachersSubjectsRouter;
