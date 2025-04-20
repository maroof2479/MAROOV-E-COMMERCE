import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/layout/Logo";
import { toast } from "@/components/ui/sonner";

// Define schema for form validation
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

// Admin credentials - in a real app with Supabase integration, 
// these would be stored securely in the database and environment variables
// For now, keeping them here but with better security plan documented
const ADMIN_EMAIL = "admin@maroov.com";
const ADMIN_PASSWORD = "admin-2479";

// Maximum login attempts before temporary lockout
const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const { loginAsAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [loginAttempts, setLoginAttempts] = useState(() => {
    const storedAttempts = localStorage.getItem('adminLoginAttempts');
    if (storedAttempts) {
      try {
        return JSON.parse(storedAttempts);
      } catch {
        return { count: 0, timestamp: 0 };
      }
    }
    return { count: 0, timestamp: 0 };
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const checkLockout = () => {
    const now = Date.now();
    if (loginAttempts.count >= MAX_LOGIN_ATTEMPTS && 
        now - loginAttempts.timestamp < LOCKOUT_TIME) {
      const remainingTime = Math.ceil((LOCKOUT_TIME - (now - loginAttempts.timestamp)) / (60 * 1000));
      toast.error(`Too many failed attempts. Please try again in ${remainingTime} minutes.`);
      return true;
    }
    
    // Reset if lockout period has passed
    if (loginAttempts.count >= MAX_LOGIN_ATTEMPTS && 
        now - loginAttempts.timestamp >= LOCKOUT_TIME) {
      setLoginAttempts({ count: 0, timestamp: 0 });
      localStorage.setItem('adminLoginAttempts', JSON.stringify({ count: 0, timestamp: 0 }));
    }
    
    return false;
  };

  const onSubmit = async (values: FormData) => {
    // Check if account is locked out
    if (checkLockout()) {
      return;
    }
    
    // Check if the credentials match the admin credentials
    if (values.email === ADMIN_EMAIL && values.password === ADMIN_PASSWORD) {
      const success = await loginAsAdmin(values.email);
      if (success) {
        // Reset login attempts on successful login
        setLoginAttempts({ count: 0, timestamp: 0 });
        localStorage.setItem('adminLoginAttempts', JSON.stringify({ count: 0, timestamp: 0 }));
        navigate("/admin");
      }
    } else {
      // Increment login attempts and update lockout timestamp
      const now = Date.now();
      const newAttempts = { 
        count: loginAttempts.count + 1, 
        timestamp: now 
      };
      
      setLoginAttempts(newAttempts);
      localStorage.setItem('adminLoginAttempts', JSON.stringify(newAttempts));
      
      if (newAttempts.count >= MAX_LOGIN_ATTEMPTS) {
        toast.error(`Too many failed attempts. Account locked for ${LOCKOUT_TIME / (60 * 1000)} minutes.`);
      } else {
        toast.error(`Invalid admin credentials. ${MAX_LOGIN_ATTEMPTS - newAttempts.count} attempts remaining.`);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/30 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="text-3xl font-serif font-medium">Admin Access</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in with your admin credentials
          </p>
        </div>

        <div className="mt-8 bg-background rounded-lg border p-8 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter admin email" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter admin password"
                          className="pl-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || checkLockout()}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Admin Login
                  </div>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
