import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import * as Yup from "yup";
import { useFormik } from "formik";

import Footer from "src/components/Footer";
import Head from "src/components/Head";
import Page from "src/components/Page";
// import Image from "next/image";

const Home: NextPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: (data) => {
      setIsSubmitting(true);
      console.log("🚀 ~ file: index.tsx ~ line 23 ~ data", data);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    },
    validationSchema: Yup.object({ email: Yup.string().email().required() }),
  });

  const handleSubmit = (email: string) => {
    fetch("https://api.getwaitlist.com/api/v1/waiter", {
      method: "POST",
      body: JSON.stringify({
        email,
        api_key: "4KJBC8",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      <Head />
      <Page>
        <Box
          minHeight="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="4xl" fontWeight="bold">
            Hello World
          </Text>
          <form onSubmit={(e) => formik.handleSubmit(e as any)}>
            <FormControl
              isInvalid={!!formik.errors.email && formik.touched.email}
            >
              <Stack direction="row">
                <Input
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="Your email"
                  aria-label="Email input"
                  variant="filled"
                  disabled={isSubmitting}
                />
                {formik.errors.email && (
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                )}
                <Button type="submit" isLoading={isSubmitting}>
                  Submit
                </Button>
              </Stack>
            </FormControl>
          </form>
        </Box>
      </Page>
      <Footer />
    </div>
  );
};

export default Home;
