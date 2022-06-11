import { useState } from "react";

export const useWaitlist = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const postNewWaitlist = async (email: string) => {
    setIsSubmitting(true);
    const request = await fetch("https://api.getwaitlist.com/api/v1/waiter", {
      method: "POST",
      body: JSON.stringify({
        email,
        api_key: "4KJBC8",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    if (data.id) {
      setIsSuccess(true);
    }
    setIsSubmitting(false);
  };

  return { postNewWaitlist, isSuccess, isSubmitting };
};
