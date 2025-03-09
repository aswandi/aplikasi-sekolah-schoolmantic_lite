
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  FileDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { classesData } from "../data/classesData";

// Define the Class interface
interface Class {
  id: string;
  name: string;
  teacher: string;
  grade: string;
  students: number;
  room: string;
  schedule: string;
  status: "Active" | "Inactive";
}

const Classes = () => {
  const { toast } = useToast();
  const [classes, setClasses] = useState<Class[]>(classesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Class>({
    id: "",
    name: "",
    teacher: "",
    grade: "",
    students: 0,
    room: "",
    schedule: "",
    status: "Active"
  });

  // Filter classes based on search term
  const filteredClasses = classes.filter(
    classItem => 
      classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle input change for form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'students' ? parseInt(value) || 0 : value
    }));
  };

  // Create new class
  const handleAddClass = () => {
    // Generate a random ID (in production, this would be handled by the database)
    const newId = `CLS${Math.floor(100000 + Math.random() * 900000)}`;
    
    const newClass = {
      ...formData,
      id: newId
    };
    
    setClasses(prev => [...prev, newClass]);
    toast({
      title: "Class Added",
      description: `${newClass.name} has been successfully added.`,
    });
    setIsAddDialogOpen(false);
    resetFormData();
  };

  // Edit existing class
  const handleEditClass = () => {
    setClasses(prev => 
      prev.map(classItem => 
        classItem.id === formData.id ? formData : classItem
      )
    );
    toast({
      title: "Class Updated",
      description: `${formData.name} has been successfully updated.`,
    });
    setIsEditDialogOpen(false);
    resetFormData();
  };

  // Delete class
  const handleDeleteClass = () => {
    setClasses(prev => 
      prev.filter(classItem => classItem.id !== formData.id)
    );
    toast({
      title: "Class Deleted",
      description: `The class has been successfully removed.`,
    });
    setIsDeleteDialogOpen(false);
    resetFormData();
  };

  // Open edit dialog and populate form with selected class data
  const openEditDialog = (classItem: Class) => {
    setFormData(classItem);
    setIsEditDialogOpen(true);
  };

  // Open delete dialog and set the class to be deleted
  const openDeleteDialog = (classItem: Class) => {
    setFormData(classItem);
    setIsDeleteDialogOpen(true);
  };

  // Reset form data
  const resetFormData = () => {
    setFormData({
      id: "",
      name: "",
      teacher: "",
      grade: "",
      students: 0,
      room: "",
      schedule: "",
      status: "Active"
    });
  };

  // Open add dialog and reset form
  const openAddDialog = () => {
    resetFormData();
    setIsAddDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Classes</h2>
          <p className="text-muted-foreground">Manage class information and schedules</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="h-9" onClick={openAddDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Add Class
          </Button>
        </div>
      </div>

      <Card className="bg-white shadow-sm border-0">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Class Management</CardTitle>
              <CardDescription>
                A total of {classes.length} classes
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search classes..."
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
                  <TableHead>ID</TableHead>
                  <TableHead>Class Name</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No classes found matching your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClasses.map((classItem) => (
                    <TableRow key={classItem.id}>
                      <TableCell className="font-medium">{classItem.id}</TableCell>
                      <TableCell>{classItem.name}</TableCell>
                      <TableCell>{classItem.teacher}</TableCell>
                      <TableCell>{classItem.grade}</TableCell>
                      <TableCell>{classItem.students}</TableCell>
                      <TableCell>{classItem.room}</TableCell>
                      <TableCell>{classItem.schedule}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={classItem.status === "Active" ? "default" : "secondary"}
                          className={classItem.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                        >
                          {classItem.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => openEditDialog(classItem)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => openDeleteDialog(classItem)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredClasses.length}</strong> of <strong>{classes.length}</strong> classes
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

      {/* Add Class Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Class</DialogTitle>
            <DialogDescription>
              Create a new class record in the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Class Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Mathematics 101"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="grade">Grade Level</Label>
                <Input
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  placeholder="e.g. 10th Grade"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="teacher">Teacher</Label>
                <Input
                  id="teacher"
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="students">Number of Students</Label>
                <Input
                  id="students"
                  name="students"
                  type="number"
                  value={formData.students.toString()}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="room">Room</Label>
                <Input
                  id="room"
                  name="room"
                  value={formData.room}
                  onChange={handleInputChange}
                  placeholder="e.g. Room 101"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleInputChange}
                  placeholder="e.g. Mon/Wed 9:00-10:30"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddDialogOpen(false)}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button 
              type="submit" 
              onClick={handleAddClass}
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Class Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
            <DialogDescription>
              Update the class information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="id">Class ID</Label>
              <Input
                id="id"
                name="id"
                value={formData.id}
                readOnly
                disabled
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Class Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="grade">Grade Level</Label>
                <Input
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="teacher">Teacher</Label>
                <Input
                  id="teacher"
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="students">Number of Students</Label>
                <Input
                  id="students"
                  name="students"
                  type="number"
                  value={formData.students.toString()}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="room">Room</Label>
                <Input
                  id="room"
                  name="room"
                  value={formData.room}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button 
              type="submit" 
              onClick={handleEditClass}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the class "{formData.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteClass}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Classes;
