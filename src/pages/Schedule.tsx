
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { classesData } from "../data/classesData";

const Schedule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter classes based on search term
  const filteredClasses = classesData.filter(
    classItem => 
      classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.schedule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Schedule</h2>
          <p className="text-muted-foreground">View and manage class schedules</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card className="bg-white shadow-sm border-0">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Schedule Management</CardTitle>
              <CardDescription>
                Viewing schedules for {classesData.length} classes
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search schedules..."
                className="pl-9 w-full md:w-[280px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class Name</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No schedules found matching your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClasses.map((classItem) => (
                    <TableRow key={classItem.id}>
                      <TableCell className="font-medium">{classItem.name}</TableCell>
                      <TableCell>{classItem.teacher}</TableCell>
                      <TableCell>{classItem.grade}</TableCell>
                      <TableCell>{classItem.room}</TableCell>
                      <TableCell>
                        <span className="font-medium">{classItem.schedule}</span>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={classItem.status === "Active" ? "default" : "secondary"}
                          className={classItem.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                        >
                          {classItem.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredClasses.length}</strong> of <strong>{classesData.length}</strong> schedules
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Schedule;
