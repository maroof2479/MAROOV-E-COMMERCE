
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import NotFound from "./NotFound";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/sonner";
import { Eye, EyeOff, LogIn } from "lucide-react";

// Define IP whitelist - in a real app, this would be stored securely
const WHITE_LISTED_IPS = ["127.0.0.1", "::1"];
const MAX_LOGIN_ATTEMPTS = 3;
const SESSION_DURATION_MINUTES = 15;

// Mock function to get client IP - in production, this would be handled server-side
const getClientIP = async () => {
  // In a real app, this would be handled by the server
  // This is just a mock for demonstration
  return "127.0.0.1";
};

// Define schema for admin login form
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Define schema for 2FA form
const totpSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type TOTPFormData = z.infer<typeof totpSchema>;

enum AuthStage {
  Initial,
  PasswordEntered,
  TOTPVerified,
  Denied,
}

const InventoryArchive = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [stage, setStage] = useState<AuthStage>(AuthStage.Initial);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [ipWhitelisted, setIpWhitelisted] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [sessionTimeout, setSessionTimeout] = useState<NodeJS.Timeout | null>(null);
  const [activityTimestamp, setActivityTimestamp] = useState<number>(Date.now());
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Define login form
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Define TOTP form
  const totpForm = useForm<TOTPFormData>({
    resolver: zodResolver(totpSchema),
    defaultValues: {
      code: "",
    },
  });

  // Secret admin credentials - in a real app, these would be securely stored
  // and verified server-side
  const ADMIN_USERNAME = "archive_manager";
  const ADMIN_PASSWORD = "secureArchive2025!";
  // TOTP secret would normally be stored securely after registration
  const MOCK_VALID_TOTP = "123456"; // Just for demo, in real app this would be validated properly

  // Check IP whitelist on component mount
  useEffect(() => {
    const checkIpWhitelist = async () => {
      try {
        const ip = await getClientIP();
        setIpAddress(ip);
        setIpWhitelisted(WHITE_LISTED_IPS.includes(ip));
      } catch (error) {
        console.error("Error checking IP:", error);
        setIpWhitelisted(false);
      }
    };

    checkIpWhitelist();
  }, []);

  // Handle user activity tracking for session timeout
  useEffect(() => {
    const handleActivity = () => {
      setActivityTimestamp(Date.now());
    };

    // Monitor user activity
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);
    window.addEventListener("click", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, []);

  // Set up session timeout
  useEffect(() => {
    const checkInactivity = () => {
      const inactiveTime = Date.now() - activityTimestamp;
      const maxInactiveTime = SESSION_DURATION_MINUTES * 60 * 1000;

      if (stage === AuthStage.TOTPVerified && inactiveTime > maxInactiveTime) {
        logout();
        toast.error("Session expired due to inactivity", {
          description: "Please log in again to continue.",
        });
      }
    };

    const interval = setInterval(checkInactivity, 60000); // Check every minute

    return () => {
      clearInterval(interval);
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
    };
  }, [activityTimestamp, stage]);

  // Handle password login submission
  const onPasswordSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));

      if (!ipWhitelisted) {
        // Log suspicious access attempt (in a real app, this would notify admins)
        console.error(`Suspicious login attempt from non-whitelisted IP: ${ipAddress}`);
        simulateSlackAlert(`Suspicious login attempt from IP ${ipAddress}`);

        // Return NotFound component without revealing the reason
        setStage(AuthStage.Denied);
        return;
      }

      // Check credentials
      if (data.username === ADMIN_USERNAME && data.password === ADMIN_PASSWORD) {
        setStage(AuthStage.PasswordEntered);
        
        // Set session timeout
        const timeout = setTimeout(() => {
          logout();
          toast.error("Session expired", {
            description: "Your session has expired. Please log in again.",
          });
        }, SESSION_DURATION_MINUTES * 60 * 1000);
        
        setSessionTimeout(timeout);
      } else {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
          // Log rate limit exceeded
          console.error(`Rate limit exceeded. IP: ${ipAddress}`);
          simulateSlackAlert(`Rate limit exceeded for IP ${ipAddress}`);
          setStage(AuthStage.Denied);
        } else {
          toast.error(`Invalid credentials. ${MAX_LOGIN_ATTEMPTS - newAttempts} attempts remaining.`);
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle TOTP submission
  const onTOTPSubmit = async (data: TOTPFormData) => {
    setIsLoading(true);

    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));

      // In a real app, verify the TOTP with a proper algorithm
      if (data.code === MOCK_VALID_TOTP) {
        setStage(AuthStage.TOTPVerified);
        toast.success("Authentication successful");
      } else {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
          console.error(`Rate limit exceeded during 2FA. IP: ${ipAddress}`);
          simulateSlackAlert(`2FA rate limit exceeded for IP ${ipAddress}`);
          setStage(AuthStage.Denied);
        } else {
          toast.error(`Invalid authentication code. ${MAX_LOGIN_ATTEMPTS - newAttempts} attempts remaining.`);
          totpForm.reset();
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock Slack alert function - in a real app, this would call an API
  const simulateSlackAlert = (message: string) => {
    console.log(`[SLACK ALERT]: ${message}`);
    // In production, this would make an API call to send a Slack notification
  };

  // Logout function
  const logout = () => {
    setStage(AuthStage.Initial);
    setLoginAttempts(0);
    loginForm.reset();
    totpForm.reset();
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }
  };

  // If authentication stage is denied or all login attempts used, show 404 page
  if (stage === AuthStage.Denied || loginAttempts >= MAX_LOGIN_ATTEMPTS) {
    return <NotFound />;
  }

  // If already authenticated via TOTP, show admin panel
  if (stage === AuthStage.TOTPVerified) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card text-card-foreground p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-medium">Inventory Archive System</h1>
            <Button variant="outline" onClick={logout}>Log Out</Button>
          </div>
        </header>
        
        <main className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-card rounded-lg shadow p-6">
                <h2 className="text-xl font-serif mb-4">Recent Archive Activities</h2>
                {/* Admin content would go here */}
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <p className="text-sm text-muted-foreground">Last sync: Today at 14:32</p>
                  </div>
                  <p>Welcome to the secure inventory management system.</p>
                  <p>This interface allows authorized personnel to manage archived inventory data.</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-card rounded-lg shadow p-6">
                <h3 className="text-lg font-serif mb-3">System Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Session expires in:</span>
                    <span className="text-accent font-medium">{SESSION_DURATION_MINUTES} min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>IP Address:</span>
                    <span className="font-mono text-sm">{ipAddress}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Status:</span>
                    <span className="text-green-500">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // If on initial login page
  if (stage === AuthStage.Initial) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-serif">Inventory Archive</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Secure document retrieval system
            </p>
          </div>

          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Access ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your access ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Access Key</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your access key"
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
                  className="w-full btn-hover-effect"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Verifying...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Continue
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

  // TOTP verification stage
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-serif">Security Verification</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the verification code from your authenticator app
          </p>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <Form {...totpForm}>
            <form onSubmit={totpForm.handleSubmit(onTOTPSubmit)} className="space-y-6">
              <FormField
                control={totpForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-center block">Authentication Code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Verifying...
                  </div>
                ) : "Verify"}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                setStage(AuthStage.Initial);
                loginForm.reset();
              }}
            >
              Back to login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryArchive;
