
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Search, Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  
  const faqItems: FAQItem[] = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also accept PayPal and Apple Pay for a seamless checkout experience.",
      category: "Orders & Payments"
    },
    {
      question: "How long does shipping take?",
      answer: "Domestic orders typically arrive within 3-5 business days. International shipping can take 7-14 business days depending on the destination. Express shipping options are available at checkout for faster delivery.",
      category: "Shipping & Delivery"
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy on all unworn and unused items in their original packaging. Please visit our Returns page for detailed instructions on how to initiate a return.",
      category: "Returns & Exchanges"
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Please note that customers are responsible for any import duties or taxes imposed by their country.",
      category: "Shipping & Delivery"
    },
    {
      question: "Are your products ethically sourced?",
      answer: "Yes, we're committed to ethical sourcing and sustainability. All our products are made with responsibly sourced materials, and we work exclusively with manufacturers that provide fair wages and safe working conditions.",
      category: "Products & Materials"
    },
    {
      question: "How do I care for my purchase?",
      answer: "Each product comes with specific care instructions. Generally, we recommend gentle cleaning with appropriate products for each material type. For detailed care instructions, please refer to the product page or the care card included with your purchase.",
      category: "Products & Materials"
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "Orders can be modified or canceled within 2 hours of placement. Please contact our customer service team immediately if you need to make changes to your order.",
      category: "Orders & Payments"
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes, we offer gift wrapping services for an additional fee. You can select this option during checkout and add a personalized message for your recipient.",
      category: "Orders & Payments"
    }
  ];

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };
  
  const filteredFAQs = searchQuery 
    ? faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems;
    
  const categories = [...new Set(faqItems.map(item => item.category))];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-serif font-medium mb-6 text-center">Frequently Asked Questions</h1>
          
          <div className="mb-8">
            <div className="relative">
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No matching questions found.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {searchQuery ? (
                <div className="space-y-4">
                  {filteredFAQs.map((item, index) => (
                    <Collapsible
                      key={index}
                      open={openItems.has(index)}
                      onOpenChange={() => toggleItem(index)}
                      className="border rounded-md overflow-hidden"
                    >
                      <CollapsibleTrigger className="w-full p-4 flex justify-between items-center hover:bg-secondary/50 text-left">
                        <span className="font-medium">{item.question}</span>
                        {openItems.has(index) ? (
                          <Minus className="h-4 w-4 flex-shrink-0" />
                        ) : (
                          <Plus className="h-4 w-4 flex-shrink-0" />
                        )}
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-4 bg-secondary/20 border-t">
                        <p className="text-muted-foreground">{item.answer}</p>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              ) : (
                categories.map(category => (
                  <div key={category}>
                    <h2 className="text-xl font-medium mb-4">{category}</h2>
                    <div className="space-y-4">
                      {faqItems
                        .filter(item => item.category === category)
                        .map((item, index) => {
                          // Calculate the actual index in the full faqItems array
                          const actualIndex = faqItems.findIndex(faq => 
                            faq.question === item.question && faq.category === category);
                          
                          return (
                            <Collapsible
                              key={actualIndex}
                              open={openItems.has(actualIndex)}
                              onOpenChange={() => toggleItem(actualIndex)}
                              className="border rounded-md overflow-hidden"
                            >
                              <CollapsibleTrigger className="w-full p-4 flex justify-between items-center hover:bg-secondary/50 text-left">
                                <span className="font-medium">{item.question}</span>
                                {openItems.has(actualIndex) ? (
                                  <Minus className="h-4 w-4 flex-shrink-0" />
                                ) : (
                                  <Plus className="h-4 w-4 flex-shrink-0" />
                                )}
                              </CollapsibleTrigger>
                              <CollapsibleContent className="p-4 bg-secondary/20 border-t">
                                <p className="text-muted-foreground">{item.answer}</p>
                              </CollapsibleContent>
                            </Collapsible>
                          );
                        })}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          
          <div className="mt-12 p-6 bg-secondary rounded-lg">
            <h3 className="text-xl font-medium mb-2">Can't find what you're looking for?</h3>
            <p className="mb-4 text-muted-foreground">
              Our customer support team is here to help. Contact us for personalized assistance.
            </p>
            <a href="/contact" className="text-primary font-medium hover:underline">
              Contact Support →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
