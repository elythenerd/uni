"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const Users_1 = __importDefault(require("./routes/Users"));
const Courses_1 = __importDefault(require("./routes/Courses"));
const Subjects_1 = __importDefault(require("./routes/Subjects"));
const Students_1 = __importDefault(require("./routes/Students"));
const TeacherSubjects_1 = __importDefault(require("./routes/TeacherSubjects"));
const CourseParticipants_1 = __importDefault(require("./routes/CourseParticipants"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use('/', Users_1.default);
app.use('/', Courses_1.default);
app.use('/', Subjects_1.default);
app.use('/', Students_1.default);
app.use('/', TeacherSubjects_1.default);
app.use('/', CourseParticipants_1.default);
const port = process.env.PORT || 7000;
const mongoUrl = process.env.MONGO_URL;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
mongoose_1.default.connect(mongoUrl).then(() => {
    console.log('connected to database');
}).catch((err) => {
    console.log(err);
});
