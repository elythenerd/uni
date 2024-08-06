"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const Users_1 = __importDefault(require("./routes/Users"));
const Courses_1 = __importDefault(require("./routes/Courses"));
const Subjects_1 = __importDefault(require("./routes/Subjects"));
const Students_1 = __importDefault(require("./routes/Students"));
const TeacherSubjects_1 = __importDefault(require("./routes/TeacherSubjects"));
const CourseParticipants_1 = __importDefault(require("./routes/CourseParticipants"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const sockets_1 = __importDefault(require("./sockets"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.io = new sockets_1.default(server);
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: '123',
    cookie: { maxAge: 60 * 60 * 60 * 24, secure: false },
    saveUninitialized: false,
    resave: false,
    rolling: true,
    // cookie: { secure: true }, // Comment this line if testing locally without HTTPS
}));
app.use('/api/users', Users_1.default);
app.use('/api/courses', Courses_1.default);
app.use('/api/subjects', Subjects_1.default);
app.use('/api/students', Students_1.default);
app.use('/api/ts', TeacherSubjects_1.default);
app.use('/api/cp', CourseParticipants_1.default);
const port = process.env.PORT || 7000;
const mongoUrl = process.env.MONGO_URL;
server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
mongoose_1.default.connect(mongoUrl).then(() => {
    console.log('connected to database');
}).catch((err) => {
    console.log(err);
});
