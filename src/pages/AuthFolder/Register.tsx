import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import RegisterForm from "@/components/RegisterForm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useAuth } from "@/Contexts/AuthProvider";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center pt-16 pb-16">
        <div className="container px-4 py-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center"
            >
              <RegisterForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="overflow-hidden rounded-lg">
                <AspectRatio ratio={1 / 1}>
                  <img
                    src="https://images.unsplash.com/photo-1575403538007-acb790100421?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bHV4dXJ5JTIwcHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
                    alt="Luxury fashion"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </AspectRatio>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Register;
