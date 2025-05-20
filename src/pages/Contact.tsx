
import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Contact = () => {
  return (
    <div className="container px-4 py-16 mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Have questions about our products or services? We're here to help.
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 rounded-lg bg-card border border-border shadow-lg"
        >
          <ContactForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col space-y-6"
        >
          <div className="overflow-hidden rounded-lg">
            <AspectRatio ratio={16/9}>
              <img 
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80" 
                alt="Contact us" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </AspectRatio>
          </div>
          
          <div className="space-y-4">
            <div className="bg-secondary/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Our Office</h3>
              <p className="text-muted-foreground">
                123 TABOUNTE OURZAZATE<br />
                OFICE BROTHER, NY 10001<br />
                MOROCO
              </p>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
              <p className="text-muted-foreground">
                Email: ABDEMOUAD@gmail.com<br />
                Phone: o6-45-87-23-90 <br />
                Hours: 24/7
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
