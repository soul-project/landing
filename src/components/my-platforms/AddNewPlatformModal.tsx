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
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import RedirectUrisField from "./AddNewPlatformModal/RedirectUrisField";
import PlatformNameField from "./AddNewPlatformModal/PlatformNameField";

export default function AddNewPlatformModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="black" margin="auto 0px">
        <ModalHeader>Create new platform</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ name: "", redirectUris: [""] }}
          onSubmit={(values) => console.log(values)}
          validationSchema={Yup.object({
            name: Yup.string().required(),
            redirectUris: Yup.array()
              .of(Yup.string().required("A valid redirect uri must be provied"))
              .min(1)
              .max(5)
              .required(),
          })}
        >
          {({ values }) => (
            <Form>
              <ModalBody>
                <VStack spacing="16px" alignItems="flex-start">
                  <PlatformNameField />
                  <RedirectUrisField redirectUris={values.redirectUris} />
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button type="submit">Submit</Button>
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
