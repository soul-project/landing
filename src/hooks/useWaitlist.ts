import { useState } from "react";

export const useWaitlist = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const postNewWaitlist = async (email: string, referralId?: string) => {
    setIsSubmitting(true);
    const request = await fetch("https://api.getwaitlist.com/api/v1/waiter", {
      method: "POST",
      body: JSON.stringify({
        email,
        // eslint-disable-next-line @cspell/spellchecker
        api_key: "4KJBC8",
        referral_link:
          referralId && `https://www.soul-network.com?ref_id=${referralId}`,
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
