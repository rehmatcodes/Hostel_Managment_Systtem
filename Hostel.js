const admin = {
    username: 'Rehmat Ullah',
    password: 'Rehmat@1122'
};

const students = [
    { id: 1, username: 'Adil Amin', password: 'Adil1100', name: 'Adil Amin', room: 101, address: "Ahmad Pur Street no 2" },
    { id: 2, username: 'Tariq Raheem', password: 'Tariq@0099', name: 'Tariq Raheem', room: 103, address: "Gagho Chook Dg Khan" },
    { id: 3, username: 'Shehriar Qadir', password: 'Shari9977', name: 'Shehrar Qadir', room: 107, address: "Gulshan ijaz Dg Khan" },
    { id: 4, username: 'Zeeshan', password: 'Zeeshan$9922', name: 'Zeeshan', room: 110, address: "larh Multan" },
    { id: 5, username: 'Fahemm Nasir', password: 'Faheem@1001', name: 'Faheem Nasir', room: 111, address: "Model Town D g Khan" },
    { id: 6, username: 'Mannan', password: 'Mannan1155', name: 'Mannan', room: 112, address: "RaheemYarKhan" },
    { id: 7, username: 'Hassan', password: 'Hassan2244', name: 'Hassan', room: 120, address: "Behram Town Layyah" },
    { id: 8, username: 'Umer Farooq', password: 'Umer@9911', name: 'Umer Farooq', room: 145, address: "Sha Town Gujrat" },
    { id: 9, username: 'Muthabir Hassan', password: 'Mutu4466', name: 'Muthabir Hassan', room: 150, address: "layyah chook munda" },
    { id: 10, username: 'Abdullah', password: 'Abdullah!1177', name: 'Abdullah', room: 175, address: "Rukan Abad Dg Khan" },
];

const rooms = [
    { number: 101, rent: 500, available: true },
    { number: 106, rent: 800, available: true },
    { number: 145, rent: 1000, available: true },
    { number: 150, rent: 1500, available: true },
    { number: 121, rent: 1500, available: true },
    { number: 190, rent: 1700, available: true },
    { number: 131, rent: 1800, available: true },
    { number: 171, rent: 2000, available: true },
    { number: 160, rent: 2100, available: true },
    { number: 121, rent: 2500, available: true },
];

function startsystem() {
    const userType = prompt('Are you an admin or a student? (Enter "admin" or "student")').toLowerCase().trim();
    if (userType === 'admin') {
        adminlogin();
    } else if (userType === 'student') {
        studentlogin();
    } else {
        alert('Invalid Input. Please Refresh And Try Again');
        startsystem();
    }
}

function adminlogin() {
    const username = prompt('Enter Admin Username:').trim();
    const password = prompt('Enter Admin Password:').trim();
    if (username === admin.username && password === admin.password) {
        adminDashboard();
    } else {
        alert('Invalid Admin Credentials.');
        startsystem();
    }
}

function adminDashboard() {
    const option = prompt(`Admin Dashboard:\n1. View Students\n2. Add Student\n3. Delete Student\n4. View Student Details\nEnter an option number:`).trim();
    switch (option) {
        case '1':
            viewStudents();
            break;
        case '2':
            addStudent();
            break;
        case '3':
            deleteStudent();
            break;
        case '4':
            viewStudentDetails();
            break;
        default:
            alert('Invalid option.');
            adminDashboard();
    }
}

function viewStudents() {
    alert('Students List:\n' + students.map(student => `ID: ${student.id}, Name: ${student.name}`).join('\n'));
    adminDashboard();
}

function addStudent() {
    const id = students.length + 1;
    const username = prompt('Enter Student username:').trim();
    const password = prompt('Enter Student password:').trim();
    const name = prompt('Enter Student Name:').trim();
    const room = parseInt(prompt('Enter room number:'), 10);
    const address = prompt('Enter Address:').trim();
    if (!username || !password || !name || isNaN(room) || !address) {
        alert('Invalid input. Please try again.');
        addStudent();
        return;
    }
    students.push({ id, username, password, name, room, address });
    alert('Student added successfully.');
    adminDashboard();
}

function deleteStudent() {
    const studentId = parseInt(prompt('Enter student id to delete:'), 10);
    const studentIndex = students.findIndex(student => student.id === studentId);
    if (studentIndex >= 0) {
        students.splice(studentIndex, 1);
        alert('Student deleted successfully.');
    } else {
        alert('Student not found.');
    }
    adminDashboard();
}

function viewStudentDetails() {
    const studentId = parseInt(prompt('Enter student id to view details:'), 10);
    const student = students.find(student => student.id === studentId);
    if (student) {
        alert(`Student Details:\nID: ${student.id}\nUsername: ${student.username}\nName: ${student.name}\nRoom No: ${student.room}\nAddress: ${student.address}`);
    } else {
        alert('Student not found.');
    }
    adminDashboard();
}

function studentlogin() {
    const username = prompt('Enter student username:').trim();
    const password = prompt('Enter student password:').trim();
    const student = students.find(student => student.username === username && student.password === password);
    if (student) {
        studentDashboard(student);
    } else {
        alert('Invalid student credentials.');
        startsystem();
    }
}

function studentDashboard(student) {
    const option = prompt(`Student Dashboard:\n1. View Available Rooms\n2. Check Room Rent\n3. Book Room\nEnter an option number:`).trim();
    switch (option) {
        case '1':
            viewAvailableRooms();
            break;
        case '2':
            checkRoomRent();
            break;
        case '3':
            bookRoom(student);
            break;
        default:
            alert('Invalid option.');
            studentDashboard(student);
    }
}

function viewAvailableRooms() {
    alert('Available Rooms:\n' + rooms.filter(room => room.available).map(room => `Room No: ${room.number}, Rent: ${room.rent}`).join('\n'));
}

function checkRoomRent() {
    const roomNumber = parseInt(prompt('Enter room number to check rent:'), 10);
    const room = rooms.find(room => room.number === roomNumber);
    if (room) {
        alert(`Room No: ${room.number}, Rent: ${room.rent}`);
    } else {
        alert('Room not found.');
    }
}

function bookRoom(student) {
    const roomNumber = parseInt(prompt('Enter room number to book:'), 10);
    const room = rooms.find(room => room.number === roomNumber && room.available);
    if (room) {
        room.available = false;
        student.room = roomNumber;
        const bill = room.rent;
        alert(`Room booked successfully.\nBill: ${bill}`);
    } else {
        alert('Room not available.');
    }
    studentDashboard(student);
}

startsystem();
