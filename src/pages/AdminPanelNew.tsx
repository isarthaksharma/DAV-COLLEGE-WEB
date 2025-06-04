
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AdminFacultyManager from '@/components/admin/AdminFacultyManager';
import AdminNewsManager from '@/components/admin/AdminNewsManager';
import AdminCoursesManager from '@/components/admin/AdminCoursesManager';
import AdminEventsManager from '@/components/admin/AdminEventsManager';
import AdminScholarshipManager from '@/components/admin/AdminScholarshipManager';
import AdminManager from '@/components/admin/AdminManager';
import AdminAuth from '@/components/admin/AdminAuth';
import { Users, Newspaper, BookOpen, Calendar, GraduationCap, Shield, LogOut } from 'lucide-react';

const AdminPanelNew = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');

  const handleLogin = (email: string) => {
    console.log('Admin logged in successfully:', email);
    setIsLoggedIn(true);
    setAdminEmail(email);
  };

  const handleLogout = () => {
    console.log('Admin logged out');
    setIsLoggedIn(false);
    setAdminEmail('');
  };

  if (!isLoggedIn) {
    return <AdminAuth onLogin={handleLogin} />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-gray-600">Welcome, {adminEmail}</p>
          <p className="text-sm text-green-600">✓ Successfully logged in as admin</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="faculty" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="faculty" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Faculty
          </TabsTrigger>
          <TabsTrigger value="news" className="flex items-center gap-2">
            <Newspaper className="h-4 w-4" />
            News
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="scholarships" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Scholarships
          </TabsTrigger>
          <TabsTrigger value="admins" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Admins
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faculty">
          <Card>
            <CardHeader>
              <CardTitle>Faculty Management</CardTitle>
              <CardDescription>
                Add, edit, and manage faculty members across all departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminFacultyManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news">
          <Card>
            <CardHeader>
              <CardTitle>News Management</CardTitle>
              <CardDescription>
                Create and manage news articles and announcements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminNewsManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Course Management</CardTitle>
              <CardDescription>
                Manage course offerings and details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminCoursesManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Event Management</CardTitle>
              <CardDescription>
                Create and manage college events and activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminEventsManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scholarships">
          <Card>
            <CardHeader>
              <CardTitle>Scholarship Applications</CardTitle>
              <CardDescription>
                View and manage scholarship applications from students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminScholarshipManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admins">
          <Card>
            <CardHeader>
              <CardTitle>Admin Management</CardTitle>
              <CardDescription>
                Create and manage admin accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminManager />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanelNew;
