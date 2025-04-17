import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronRight, Mail, Phone, MapPin, Clock, Instagram, Facebook, Twitter } from "lucide-react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About | Maroov";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative bg-neutral-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-20 md:py-28">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6">Our Story</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Founded in 2018, Maroov began as a small boutique with a vision to redefine contemporary fashion.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-serif mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  At Maroov, we believe that fashion should be both beautiful and accessible. Our mission is to create high-quality, thoughtfully designed pieces that elevate everyday style.
                </p>
                <p className="text-muted-foreground mb-4">
                  We source sustainable materials and partner with ethical manufacturers to ensure our products are made with care for both people and planet.
                </p>
                <p className="text-muted-foreground">
                  Each collection is curated with intention, focusing on versatile pieces that can be styled in multiple ways to create a mindful wardrobe that lasts beyond trends.
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground italic">Image Placeholder</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-neutral-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif text-center mb-12">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Elena Chen", role: "Founder & Creative Director" },
                { name: "Marcus Wei", role: "Head of Design" },
                { name: "Sofia Patel", role: "Product Development" },
              ].map((member, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 shadow-sm rounded-lg text-center">
                  <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-muted-foreground">Photo</span>
                  </div>
                  <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif text-center mb-12">Get In Touch</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 mt-1 text-primary" />
                  <div>
                    <h3 className="font-medium mb-1">Our Store</h3>
                    <p className="text-muted-foreground">123 Design Avenue, Design District, San Francisco, CA 94105</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-5 h-5 mt-1 text-primary" />
                  <div>
                    <h3 className="font-medium mb-1">Opening Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 10am - 7pm</p>
                    <p className="text-muted-foreground">Saturday: 11am - 6pm</p>
                    <p className="text-muted-foreground">Sunday: 12pm - 5pm</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-5 h-5 mt-1 text-primary" />
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-5 h-5 mt-1 text-primary" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-muted-foreground">hello@maroov.com</p>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="font-medium mb-3">Follow Us</h3>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon">
                      <Instagram className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        className="w-full p-2 border rounded-md bg-background"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        className="w-full p-2 border rounded-md bg-background"
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input
                      id="subject"
                      className="w-full p-2 border rounded-md bg-background"
                      type="text"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="w-full p-2 border rounded-md bg-background min-h-[150px]"
                    />
                  </div>

                  <Button className="w-full">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
