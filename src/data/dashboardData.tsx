
import { Users, GraduationCap, Book, Calendar, Award, Bell, Check, FileText } from "lucide-react";

export const attendanceData = [
  { day: "Mon", attendance: 95.2 },
  { day: "Tue", attendance: 94.8 },
  { day: "Wed", attendance: 96.5 },
  { day: "Thu", attendance: 93.7 },
  { day: "Fri", attendance: 97.1 },
  { day: "Sat", attendance: 91.4 },
  { day: "Sun", attendance: 89.8 },
];

export const studentsData = [
  {
    name: "Emma Johnson",
    class: "Grade 10-A",
    score: 98.5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Liam Chen",
    class: "Grade 11-B",
    score: 97.3,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Sophia Martinez",
    class: "Grade 9-C",
    score: 96.8,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Aiden Williams",
    class: "Grade 12-A",
    score: 95.5,
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Olivia Thompson",
    class: "Grade 10-B",
    score: 94.9,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export const recentActivities = [
  {
    title: "New Academic Calendar Released",
    time: "Today, 10:30 AM",
    icon: Calendar,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
  },
  {
    title: "Staff Meeting Scheduled",
    time: "Yesterday, 2:15 PM",
    icon: Users,
    iconColor: "text-green-500",
    iconBg: "bg-green-50",
  },
  {
    title: "End of Term Exams Announced",
    time: "2 days ago, 11:00 AM",
    icon: FileText,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50",
  },
  {
    title: "Annual Sports Day Preparation",
    time: "3 days ago, 9:45 AM",
    icon: Award,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
  },
];
