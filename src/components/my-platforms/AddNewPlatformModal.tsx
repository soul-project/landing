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
import { useMutation } from "react-query";
import { useSession } from "next-auth/react";

import { create, CreateArgs } from "src/modules/platforms/actions";

import RedirectUrisField from "./AddNewPlatformModal/RedirectUrisField";
import PlatformNameField from "./AddNewPlatformModal/PlatformNameField";

export default function AddNewPlatformModal({ isOpen, onClose }: Props) {
  const toast = useToast();
  const { data: session } = useSession();

  // TODO: Invalidate the query key once post is successful
  const { mutateAsync: createPlatform, error } = useMutation<
    any,
    void,
    CreateArgs
  >((args) => create(args));

  if (!session) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="black" margin="auto 0px">
        <ModalHeader>Create new platform</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ name: "", redirectUris: [""] }}
          onSubmit={async (values, action) => {
            try {
              await createPlatform({
                accessToken: session.accessToken,
                ...values,
              });
            } catch (err) {}

            if (error) {
              // TODO: Include some error message in the description especially the constraints
              // or duplicate names (if we have)
              toast({
                title: "Platform creation failed.",
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "bottom-right",
              });
            } else {
              toast({
                title: "Platform created.",
                description: "We've created your account for you.",
                status: "success",
                duration: 9000,
                isClosable: true,
                position: "bottom-right",
              });
            }
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
