"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Students_1 = require("../services/Students");
const studentsRouter = (0, express_1.Router)();
studentsRouter.post('/api/students/create', Students_1.createStudents);
studentsRouter.get('/api/students/get', Students_1.getStudents);
exports.default = studentsRouter;
