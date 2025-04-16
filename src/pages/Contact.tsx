
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log(values);
      toast.success("Message sent successfully! We'll get back to you soon.");
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-serif font-medium mb-6 text-center">Contact Us</h1>
          <div className="mb-12">
            <p className="text-center text-muted-foreground mb-4">
              Have questions about our products or services? We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Visit Our Store</h3>
                <p className="text-muted-foreground">
                  123 Design Avenue<br />
                  San Francisco, CA 94107<br />
                  United States
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Store Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 10am - 7pm<br />
                  Saturday: 11am - 6pm<br />
                  Sunday: 12pm - 5pm
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                <p className="text-muted-foreground">
                  Email: info@aestheticavenue.com<br />
                  Phone: (555) 123-4567
                </p>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <div className="bg-card p-6 rounded-lg border">
                <h2 className="text-2xl font-medium mb-6">Send us a message</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="What is this regarding?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message..." 
                              className="min-h-[150px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
