
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [activeTab, setActiveTab] = useState("login");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if it's an admin login
    if (loginEmail === 'amardeep.gupta@gmail.com' && loginPassword === '123456' ||
        loginEmail === 'puneet.sharma@gmail.com' && loginPassword === '123456') {
      toast({
        title: "Admin Login Successful",
        description: "You have been logged in successfully as an admin.",
      });
      localStorage.setItem("adminAuth", "true");
      navigate("/admin");
      return;
    }
    
    // Regular student login
    if (loginEmail && loginPassword) {
      toast({
        title: "Login Successful",
        description: "You have been logged in successfully.",
      });
      // Redirect to dashboard in a real application
      navigate("/");
    } else {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerEmail || !registerPassword || !confirmPassword || !studentId) {
      toast({
        title: "Registration Failed",
        description: "Please fill all the required fields.",
        variant: "destructive",
      });
      return;
    }

    if (registerPassword !== confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    // This is just a demo, in a real app you would call an API
    toast({
      title: "Registration Successful",
      description: "Your account has been created. Please verify your email to continue.",
    });
    setActiveTab("login");
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Student Portal</CardTitle>
          <CardDescription>Access your student account or admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Sign In</Button>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Admin Access:</p>
                  <p className="text-xs text-muted-foreground">Email: amardeep.gupta@gmail.com</p>
                  <p className="text-xs text-muted-foreground">Password: 123456</p>
                  <p className="text-xs text-muted-foreground mt-1">or</p>
                  <p className="text-xs text-muted-foreground">Email: puneet.sharma@gmail.com</p>
                  <p className="text-xs text-muted-foreground">Password: 123456</p>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="student-id">Student ID</Label>
                  <Input 
                    id="student-id" 
                    placeholder="Enter your student ID" 
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input 
                    id="register-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Create Account</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <p className="text-sm text-gray-500 mt-4">
            By continuing, you agree to DAV College's{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
