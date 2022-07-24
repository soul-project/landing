import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import { useMutation } from "react-query";

import RedirectUrisField from "./AddNewPlatformModal/RedirectUrisField";
import PlatformNameField from "./AddNewPlatformModal/PlatformNameField";

export default function AddNewPlatformModal({ isOpen, onClose }: Props) {
  const toast = useToast();
  // useMutation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="black" margin="auto 0px">
        <ModalHeader>Create new platform</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ name: "", redirectUris: [""] }}
          onSubmit={async (values, action) => {
            // TODO: Implement a toast https://chakra-ui.com/docs/components/toast
            // for error messages from the backend
            toast({
              title: "Platform created.",
              description: `We've created your account for you. ${JSON.stringify(
                values
              )}`,
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "bottom-right",
            });
            action.setSubmitting(false);
          }}
          validationSchema={Yup.object({
            name: Yup.string().required(),
            redirectUris: Yup.array()
              .of(Yup.string().required("A valid redirect uri must be provied"))
              .min(1)
              .max(5)
              .required(),
          })}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <ModalBody>
                <VStack spacing="16px" alignItems="flex-start">
                  <PlatformNameField />
                  <RedirectUrisField redirectUris={values.redirectUris} />
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" isLoading={isSubmitting}>
                  Submit
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
