
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

const Classes = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Classes</h2>
        <p className="text-muted-foreground">Manage class information and schedules</p>
      </div>

      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle>Class Management</CardTitle>
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
                The class management module will include features for creating and managing classes, assigning teachers, registering students, and tracking class performance metrics.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Classes;
