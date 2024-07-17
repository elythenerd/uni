"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Courses_1 = require("../services/Courses");
const cousreRouter = (0, express_1.Router)();
cousreRouter.post('/api/courses/create', Courses_1.createCourse);
cousreRouter.get('/api/courses/get', Courses_1.getCourses);
exports.default = cousreRouter;
