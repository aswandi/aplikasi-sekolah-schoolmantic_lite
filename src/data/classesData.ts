
// Define the Class interface
export interface Class {
  id: string;
  name: string;
  teacher: string;
  grade: string;
  students: number;
  room: string;
  schedule: string;
  status: "Active" | "Inactive";
}

// Sample class data
export const classesData: Class[] = [
  {
    id: "CLS100001",
    name: "Mathematics 101",
    teacher: "John Smith",
    grade: "10th Grade",
    students: 28,
    room: "Room 201",
    schedule: "Mon/Wed/Fri 9:00-10:30",
    status: "Active"
  },
  {
    id: "CLS100002",
    name: "Physics",
    teacher: "Maria Johnson",
    grade: "11th Grade",
    students: 24,
    room: "Lab 102",
    schedule: "Tue/Thu 11:00-12:30",
    status: "Active"
  },
  {
    id: "CLS100003",
    name: "English Literature",
    teacher: "Robert Brown",
    grade: "10th Grade",
    students: 30,
    room: "Room 105",
    schedule: "Mon/Wed 13:00-14:30",
    status: "Active"
  },
  {
    id: "CLS100004",
    name: "Biology",
    teacher: "Sarah Wilson",
    grade: "12th Grade",
    students: 22,
    room: "Lab 203",
    schedule: "Tue/Thu 9:00-10:30",
    status: "Active"
  },
  {
    id: "CLS100005",
    name: "History",
    teacher: "James Davis",
    grade: "9th Grade",
    students: 32,
    room: "Room 302",
    schedule: "Wed/Fri 10:45-12:15",
    status: "Active"
  },
  {
    id: "CLS100006",
    name: "Computer Science",
    teacher: "Emily Clark",
    grade: "11th Grade",
    students: 18,
    room: "Lab 104",
    schedule: "Mon/Thu 14:30-16:00",
    status: "Active"
  },
  {
    id: "CLS100007",
    name: "Art & Design",
    teacher: "Michael Turner",
    grade: "10th Grade",
    students: 24,
    room: "Art Studio",
    schedule: "Tue/Fri 13:00-14:30",
    status: "Active"
  },
  {
    id: "CLS100008",
    name: "Chemistry",
    teacher: "Lisa Anderson",
    grade: "12th Grade",
    students: 20,
    room: "Lab 201",
    schedule: "Mon/Wed 10:45-12:15",
    status: "Inactive"
  },
  {
    id: "CLS100009",
    name: "Physical Education",
    teacher: "David Martinez",
    grade: "9th Grade",
    students: 35,
    room: "Gymnasium",
    schedule: "Tue/Thu 14:30-16:00",
    status: "Active"
  },
  {
    id: "CLS100010",
    name: "Economics",
    teacher: "Jennifer White",
    grade: "12th Grade",
    students: 26,
    room: "Room 305",
    schedule: "Wed/Fri 9:00-10:30",
    status: "Inactive"
  }
];
