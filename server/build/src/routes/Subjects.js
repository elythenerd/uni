"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Subjects_1 = require("../services/Subjects");
const subjectRouter = (0, express_1.Router)();
subjectRouter.post('/api/subjects/create', Subjects_1.createSubject);
subjectRouter.get('/api/subjects/get', Subjects_1.getSubjects);
exports.default = subjectRouter;
