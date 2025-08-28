"use server"
import emailjs from '@emailjs/browser';

export async function submit(formData) {
    const fullName = formData.get("fullName")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC;

    console.log(serviceID)

    /* need to replace with service, template key, and public key (env?) */ 
    emailjs.send(serviceID, templateID, {
      name: fullName,
      message: message,
      title: subject,
      email: email,
    }, {
      publicKey: publicKey
    }).then(
      () => {
          alert("Message sent successfully!")
        },
        (error) => {
          alert("Message unsuccessful, please try again or contact AKPSI Leadership.")
        },
    );
  }