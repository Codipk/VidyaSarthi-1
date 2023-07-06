import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";
import HighLightText from "../HomePage/HighLightText";
const ContactFormSection = () => {
  return (
    <div className="mx-auto">
      <h1 className="text-center text-4xl font-semibold">
        <HighLightText text={"Get in Touch"} />
      </h1>
      <p>We'd love to know more about yourself and what you're got in a mind</p>
      <div className="mt-12 mx-auto">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
