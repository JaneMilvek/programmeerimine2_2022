import express, { Request, Response } from 'express';
import { idText } from 'typescript';
const app = express();
const PORT = 3000;

app.use(express.json());

interface INewUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

interface IUser extends INewUser {
    id: number;
};

interface INewLecturer {
    firstName: string;
    lastName: string;
};

interface ILecturer extends INewLecturer {
    id: number;
};

interface INewCourse {
    name: string;
};

interface ICourse extends INewCourse {
    id: number;
};

interface INewSubject {
    name: string;
    EAP: number;
};

interface ISubject extends INewSubject {
    id: number;
};

interface INewClassroom {
    name: string;
};

interface IClassroom extends INewClassroom {
    id: number;
};

const users: IUser[] = [
    {
        id: 1,
        firstName: 'Juhan',
        lastName: 'Juurikas',
        email: 'juhan@juurikas.ee',
        password: 'juhan',
    },
    {
        id: 2,
        firstName: 'Mari',
        lastName: 'Maasikas',
        email: 'mari@maasikas.ee',
        password: 'mari',
    }
];

const lecturers: ILecturer[] = [
    {
        id: 1,
        firstName: 'Martti',
        lastName: 'Raavel',
    },
    {
        id: 2,
        firstName: 'Laura',
        lastName: 'Hein',
    },
];

const courses: ICourse[] = [
    {
        id: 1,
        name: 'RIF1',
    },
    {
        id: 2,
        name: 'RIF2',
    },
    {
        id: 3,
        name: 'RIF3',
    },
];

const subjects: ISubject[] = [
    {
        id: 1,
        name: 'Valikpraktika',
        EAP: 10,
    },
    {
        id: 2,
        name: 'Erialane inglise keel II',
        EAP: 3,
    },
    {
        id: 3,
        name: 'IT ja õigus',
        EAP: 3,
    },
];

const classrooms: IClassroom[] = [
    {
        id: 1,
        name: 'Arvutilabor 205',
    },
    {
        id: 2,
        name: 'Auditoorium 207',
    },
    {
        id: 3,
        name: 'Auditoorium 307',
    },
];

app.get('/api/v1/health', (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'Hello world!',
    });
});


/** Users endpoints*/

app.get('/api/v1/users', (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        message: 'List of users',
        users,
    });
});

app.get('/api/v1/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = users.find(element => {
        return element.id === id;
    });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    };
    return res.status(200).json({
        success: true,
        message: 'User',
        data: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }
    });
});

app.post('/api/v1/users', (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    const id = users.length + 1;
    const newUser: IUser = {
        id,
        firstName,
        lastName,
        email,
        password,
    };
    users.push(newUser);

    return res.status(201).json({
        success: true,
        message: `User with id ${newUser.id} created`,
    });
});

app.patch('/api/v1/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, email, password } = req.body;
    const user = users.find(element => {
        return element.id === id;
    });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    };
    if (!firstName && !lastName && !email && !password) {
        return res.status(400).json({
            success: false,
            message: 'Nothing to change',
        });
    };
    if(firstName) user.firstName = firstName;
    if(lastName) user.lastName = lastName;
    if(email) user.email = email;
    if(password) user.password = password;
    return res.status(200).json({
        success: true,
        message: 'User updated',
    });
});

app.delete('/api/v1/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }
    users.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: 'User deleted',
    });
});


/** Lecturers endpoints */

app.get('/api/v1/lecturers', (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        message: 'List of lecturers',
        lecturers,
    });
});

app.get('/api/v1/lecturers/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const lecturer = lecturers.find(element => {
        return element.id === id;
    });
    if (!lecturer) {
        return res.status(404).json({
            success: false,
            message: 'Lecturer not found',
        });
    };
    return res.status(200).json({
        success: true,
        message: 'User',
        data: {
            id: lecturer.id,
            firstName: lecturer.firstName,
            lastName: lecturer.lastName,
        }
    });
});

app.post('/api/v1/lecturers', (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;
    const id = lecturers.length + 1;
    const newLecturer: ILecturer = {
        id,
        firstName,
        lastName,
    };
    lecturers.push(newLecturer);

    return res.status(201).json({
        success: true,
        message: `Lecturer with id ${newLecturer.id} created`,
    });
});

app.patch('/api/v1/lecturers/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName } = req.body;
    const lecturer = lecturers.find(element => {
        return element.id === id;
    });
    if (!lecturer) {
        return res.status(404).json({
            success: false,
            message: 'Lecturer not found',
        });
    };
    if (!firstName && !lastName) {
        return res.status(400).json({
            success: false,
            message: 'Nothing to change',
        });
    };
    if(firstName) lecturer.firstName = firstName;
    if(lastName) lecturer.lastName = lastName;
    return res.status(200).json({
        success: true,
        message: 'Lecturer updated',
    });
});

app.delete('/api/v1/lecturers/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = lecturers.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Lecturer not found',
        });
    }
    lecturers.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: 'Lecturer deleted',
    });
});


/** Courses endpoints */

app.get('/api/v1/courses', (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        message: 'List of courses',
        courses,
    });
});

app.get('/api/v1/courses/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const course = courses.find(element => {
        return element.id === id;
    });
    if (!course) {
        return res.status(404).json({
            success: false,
            message: 'Course not found',
        });
    };
    return res.status(200).json({
        success: true,
        message: 'Course',
        data: {
            id: course.id,
            name: course.name,
        }
    });
});

app.post('/api/v1/courses', (req: Request, res: Response) => {
    const { name } = req.body;
    const id = courses.length + 1;
    const newCourse: ICourse = {
        id,
        name
    };
    courses.push(newCourse);

    return res.status(201).json({
        success: true,
        message: `Course with id ${newCourse.id} created`,
    });
});

app.patch('/api/v1/courses/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const course = courses.find(element => {
        return element.id === id;
    });
    if (!course) {
        return res.status(404).json({
            success: false,
            message: 'Course not found',
        });
    };
    if (!name) {
        return res.status(400).json({
            success: false,
            message: 'Nothing to change',
        });
    };
    if(name) course.name = name;
    return res.status(200).json({
        success: true,
        message: 'Course updated',
    });
});

app.delete('/api/v1/courses/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = courses.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Course not found',
        });
    }
    courses.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: 'Course deleted',
    });
});


/**Subjects endpoints */

app.get('/api/v1/subjects', (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        message: 'List of subjects',
        subjects,
    });
});

app.get('/api/v1/subjects/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const subject = subjects.find(element => {
        return element.id === id;
    });
    if (!subject) {
        return res.status(404).json({
            success: false,
            message: 'Subject not found',
        });
    };
    return res.status(200).json({
        success: true,
        message: 'Subject',
        data: {
            id: subject.id,
            name: subject.name,
            EAP: subject.EAP,
        }
    });
});

app.post('/api/v1/subjects', (req: Request, res: Response) => {
    const { name, EAP } = req.body;
    const id = subjects.length + 1;
    const newSubject: ISubject = {
        id,
        name,
        EAP,
    };
    subjects.push(newSubject);

    return res.status(201).json({
        success: true,
        message: `Subject with id ${newSubject.id} created`,
    });
});

app.patch('/api/v1/subjects/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, EAP } = req.body;
    const subject = subjects.find(element => {
        return element.id === id;
    });
    if (!subject) {
        return res.status(404).json({
            success: false,
            message: 'Subject not found',
        });
    };
    if (!name && !EAP) {
        return res.status(400).json({
            success: false,
            message: 'Nothing to change',
        });
    };
    if(name) subject.name = name;
    if(EAP) subject.EAP = EAP;
    return res.status(200).json({
        success: true,
        message: 'Subject updated',
    });
});

app.delete('/api/v1/subjects/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = subjects.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Subject not found',
        });
    }
    subjects.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: 'Subject deleted',
    });
});


/** Classrooms endpoints */

app.get('/api/v1/classrooms', (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        message: 'List of classrooms',
        classrooms,
    });
});

app.get('/api/v1/classrooms/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const classroom = classrooms.find(element => {
        return element.id === id;
    });
    if (!classroom) {
        return res.status(404).json({
            success: false,
            message: 'Classroom not found',
        });
    };
    return res.status(200).json({
        success: true,
        message: 'Classroom',
        data: {
            id: classroom.id,
            name: classroom.name,
        }
    });
});

app.post('/api/v1/classrooms', (req: Request, res: Response) => {
    const { name } = req.body;
    const id = classrooms.length + 1;
    const newClassroom: IClassroom = {
        id,
        name,
    };
    classrooms.push(newClassroom);

    return res.status(201).json({
        success: true,
        message: `Classroom with id ${newClassroom.id} created`,
    });
});

app.patch('/api/v1/classrooms/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const classroom = classrooms.find(element => {
        return element.id === id;
    });
    if (!classroom) {
        return res.status(404).json({
            success: false,
            message: 'Classroom not found',
        });
    };
    if (!name) {
        return res.status(400).json({
            success: false,
            message: 'Nothing to change',
        });
    };
    if(name) classroom.name = name;
    return res.status(200).json({
        success: true,
        message: 'Classroom updated',
    });
});

app.delete('/api/v1/classrooms/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = classrooms.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Classroom not found',
        });
    }
    classrooms.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: 'Classroom deleted',
    });
});


app.listen(PORT, () => {
    console.log('Server is running');
});