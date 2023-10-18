import React from "react";
import { ContactForm } from "../components/ContactForm";
import { IconsContact } from "../components/IconsContact";



export const ContactPage = () => {
  return (
<>
<section className="relative">
   <div> <img 
        src="https://images.pexels.com/photos/3727464/pexels-photo-3727464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
        alt="Descriptive Imagery" 
        className="w-full max-w-full h-auto md:h-[50vh] object-cover"
        style={{ objectPosition: "top" }}
    />
    </div>
</section>
      
      <section className="p-6 md:p-12"> 
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl text-center tracking-wide mb-10 font-semibold">Contacta con nosotros</h1>
          <div className="flex flex-wrap md:flex-nowrap gap-6 max-w-3xl mx-auto">
            <div className="flex-1">
              <ContactForm />
            </div>    
            <div className="w-full md:w-auto">
              <IconsContact />
            </div>

          </div>
        </div>
      </section>
    </>
  )
};
