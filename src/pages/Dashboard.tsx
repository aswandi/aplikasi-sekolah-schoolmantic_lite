
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend } from "recharts";
import { Calendar, Users, GraduationCap, Book, Activity, TrendingUp, Clock, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { attendanceData, studentsData, recentActivities } from "../data/dashboardData";

const Dashboard = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Performance data
  const performanceData = [
    { name: "Jan", value: 82 },
    { name: "Feb", value: 78 },
    { name: "Mar", value: 85 },
    { name: "Apr", value: 88 },
    { name: "May", value: 90 },
    { name: "Jun", value: 92 },
  ];

  // Enrollment distribution
  const enrollmentData = [
    { name: "Science", value: 320, color: "#0088FE" },
    { name: "Arts", value: 280, color: "#00C49F" },
    { name: "Commerce", value: 200, color: "#FFBB28" },
    { name: "Vocational", value: 140, color: "#FF8042" },
  ];

  // Get greeting based on time of day
  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        setGreeting("Good morning");
      } else if (currentHour < 18) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
    };

    updateGreeting();
    
    // Update the time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      updateGreeting();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">{greeting}, {user?.name.split(' ')[0]}</h2>
          <p className="text-muted-foreground">
            {formatDate(currentTime)} • {formatTime(currentTime)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Clock className="mr-2 h-4 w-4" />
            View Schedule
          </Button>
          <Button size="sm" className="h-9">
            <BellRing className="mr-2 h-4 w-4" />
            Notifications
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white shadow-sm border-0 card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <h3 className="text-2xl font-bold mt-1">2,340</h3>
                <p className="text-xs text-green-500 font-medium mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +12.5% from last month
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0 card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Teachers</p>
                <h3 className="text-2xl font-bold mt-1">132</h3>
                <p className="text-xs text-green-500 font-medium mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +4.2% from last month
                </p>
              </div>
              <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0 card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Classes</p>
                <h3 className="text-2xl font-bold mt-1">87</h3>
                <p className="text-xs text-muted-foreground font-medium mt-1">
                  Across 12 departments
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center">
                <Book className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0 card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                <h3 className="text-2xl font-bold mt-1">94.2%</h3>
                <p className="text-xs text-green-500 font-medium mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +1.8% from last week
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-50 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Performance Chart */}
        <Card className="lg:col-span-3 bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle>Overall Performance</CardTitle>
            <CardDescription>Average academic performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    formatter={(value) => [`${value}%`, 'Performance']}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#0066FF"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Enrollment Distribution */}
        <Card className="lg:col-span-2 bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle>Enrollment Distribution</CardTitle>
            <CardDescription>Students by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={enrollmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {enrollmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [value, 'Students']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from the school</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${activity.iconBg}`}>
                    <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Attendance Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Attendance Chart */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
            <CardDescription>Daily attendance for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={attendanceData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="day" />
                  <YAxis domain={[85, 100]} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Attendance']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="attendance" fill="#0066FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Students */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle>Top Performing Students</CardTitle>
            <CardDescription>Based on recent assessment scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentsData.map((student, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.class}</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      {student.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
