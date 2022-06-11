import {
  FormControl,
  Stack,
  Box,
  Input,
  FormErrorMessage,
  Button,
  Text,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function CTAForm({
  isSubmitting,
  isSuccess,
  submitWaitlist,
}: Props) {
  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: (data) => submitWaitlist(data.email),
    validationSchema: Yup.object({ email: Yup.string().email().required() }),
  });

  return (
    <>
      <Text
        fontSize="4xl"
        fontWeight="bold"
        textAlign={["center", "center", "left"]}
      >
        Develop with us today!
      </Text>
      <Text maxW="500px" textAlign={["center", "center", "left"]}>
        Soul is a user authentication and identity provider built for a
        decentralized social media eco-system.
      </Text>
      <form onSubmit={(e) => formik.handleSubmit(e as any)}>
        <FormControl isInvalid={!!formik.errors.email && formik.touched.email}>
          <Stack
            direction="row"
            justifyContent={["center", "center", "left"]}
            mt={[4, 4, 0]}
          >
            <Box>
              <Input
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Your email"
                aria-label="Email input"
                variant="filled"
                disabled={isSubmitting || isSuccess}
              />
              {formik.errors.email && (
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              )}
            </Box>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSuccess}
              leftIcon={isSuccess ? <CheckCircleIcon /> : undefined}
            >
              {isSuccess ? "Success" : "Join"}
            </Button>
          </Stack>
        </FormControl>
      </form>
    </>
  );
}

type Props = {
  isSubmitting: boolean;
  isSuccess: boolean;
  submitWaitlist: (email: string) => void;
};
