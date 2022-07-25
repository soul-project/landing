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
import { useMutation, useQueryClient } from "react-query";
import { useSession } from "next-auth/react";

import { create, CreateArgs, getMyList } from "src/modules/platforms/actions";

import RedirectUrisField from "./AddNewPlatformModal/RedirectUrisField";
import PlatformNameField from "./AddNewPlatformModal/PlatformNameField";
import { formSchema, FormValues } from "./form";

export default function AddNewPlatformModal({ isOpen, onClose }: Props) {
  const toast = useToast();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { mutateAsync: createPlatform } = useMutation<any, void, CreateArgs>(
    (args) => create(args)
  );

  if (!session) return null;

  const handleSubmit = async (values: FormValues) => {
    try {
      await createPlatform({
        accessToken: session.accessToken,
        ...values,
      });
    } catch (err: any) {
      toast({
        title: "Platform creation failed.",
        description: err.response.data.constraints
          ? err.response.data.constraints.join(" ")
          : err.response.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    toast({
      title: "Platform created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "bottom-right",
    });
    await queryClient.invalidateQueries(getMyList.key);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="black" margin="auto 0px">
        <ModalHeader>Create new platform</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ name: "", redirectUris: [""] }}
          onSubmit={handleSubmit}
          validationSchema={formSchema}
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
