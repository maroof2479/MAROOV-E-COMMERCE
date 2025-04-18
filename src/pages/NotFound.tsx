
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HomeIcon, ArrowLeft, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found | Aesthetic Avenue";
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="container max-w-md mx-auto px-4 py-16 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900/20">
              <AlertCircle className="h-10 w-10 text-orange-500" />
            </div>
          </div>
          
          <h1 className="mb-4 text-4xl font-serif font-bold">404</h1>
          <p className="mb-2 text-2xl font-medium">Page not found</p>
          <p className="mb-8 text-muted-foreground">
            We couldn't find the page you're looking for. It might have been removed or doesn't exist.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-hover-effect">
              <Link to="/">
                <HomeIcon className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()} className="btn-hover-effect">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
