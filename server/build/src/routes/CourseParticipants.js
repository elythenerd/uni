"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CourseParticipants_1 = require("../services/CourseParticipants");
const cousreParticipantRouter = (0, express_1.Router)();
cousreParticipantRouter.post('/api/courses/create', CourseParticipants_1.createCourseParticipant);
cousreParticipantRouter.get('/api/courses/get', CourseParticipants_1.getCourseParticipants);
exports.default = cousreParticipantRouter;
