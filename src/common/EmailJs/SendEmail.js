import emailjs from "@emailjs/browser";
import React, { useRef } from "react";

export function SendEmail(templatParams){


    

   

    emailjs.sendForm('service_8ce1a4n', 'template_3o2cwue', templatParams, '71j5YCM0MFPV6tubJ')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
}