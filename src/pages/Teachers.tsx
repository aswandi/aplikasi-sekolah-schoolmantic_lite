
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

const Teachers = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Teachers</h2>
        <p className="text-muted-foreground">Manage teacher information and assignments</p>
      </div>

      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle>Teacher Management</CardTitle>
          <CardDescription>
            This module will be implemented in the next phase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start rounded-md bg-blue-50 p-4">
            <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900">Coming Soon</h3>
              <p className="text-blue-700 text-sm mt-1">
                The teacher management module will include features for viewing teacher profiles, managing subject assignments, performance tracking, and schedule management.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Teachers;
