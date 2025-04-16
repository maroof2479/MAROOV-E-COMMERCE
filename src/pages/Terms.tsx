
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-serif font-medium mb-6">Terms & Conditions</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="lead">
              These Terms & Conditions govern your use of Aesthetic Avenue's website and services.
              By accessing or using our website, you agree to be bound by these terms.
            </p>
            
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Aesthetic Avenue's website, you agree to be bound by these Terms & Conditions 
              and all applicable laws and regulations. If you do not agree with any of these terms, you are 
              prohibited from using or accessing this site.
            </p>
            
            <h2>2. Products & Services</h2>
            <p>
              All products and services offered on our website are described with accuracy and fairness. 
              However, we do not warrant that product descriptions or other content is accurate, complete, 
              reliable, current, or error-free.
            </p>
            
            <h2>3. Pricing & Payment</h2>
            <p>
              All prices are shown in USD and are subject to change without notice. We reserve the right to 
              modify or discontinue any product or service without notice. We shall not be liable to you or any 
              third party for any modification, price change, suspension, or discontinuance of the service.
            </p>
            
            <h2>4. Shipping & Delivery</h2>
            <p>
              Shipping and delivery timeframes are estimates only. Aesthetic Avenue is not responsible for 
              shipping delays due to customs processing, weather conditions, or other circumstances beyond our 
              control.
            </p>
            
            <h2>5. Returns & Refunds</h2>
            <p>
              We accept returns of unused and unopened products within 30 days of delivery. Please refer to our 
              Return Policy for detailed instructions on how to initiate a return.
            </p>
            
            <h2>6. Privacy Policy</h2>
            <p>
              Your use of Aesthetic Avenue's website is also governed by our Privacy Policy, which outlines 
              how we collect, use, and protect your personal information.
            </p>
            
            <h2>7. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, images, and software, is the 
              property of Aesthetic Avenue or its content suppliers and is protected by international copyright 
              laws.
            </p>
            
            <h2>8. User Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate, complete, and current information. 
              You are responsible for maintaining the confidentiality of your account and password and for 
              restricting access to your computer.
            </p>
            
            <h2>9. Limitation of Liability</h2>
            <p>
              Aesthetic Avenue shall not be liable for any direct, indirect, incidental, special, or 
              consequential damages resulting from the use or inability to use our services or for the cost of 
              procurement of substitute products and services.
            </p>
            
            <h2>10. Governing Law</h2>
            <p>
              These Terms & Conditions are governed by and construed in accordance with the laws of the United 
              States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
            
            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to update or change these Terms & Conditions at any time without notice. 
              Your continued use of the service after any changes indicates your acceptance of the new Terms & 
              Conditions.
            </p>
            
            <p className="mt-8">
              Last updated: April 16, 2025
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
