import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  ModalFooter,
  useClipboard,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export default function AccessTokenModal({ isOpen, onClose }: Props) {
  const { data: session } = useSession();
  const { hasCopied, onCopy } = useClipboard(session?.accessToken || "");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="black" margin="auto 0px">
        <ModalHeader>Your access token</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup size="md">
            <Input
              pr="66px"
              type="text"
              value={session?.accessToken}
              contentEditable={false}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={onCopy}>
                {hasCopied ? <CheckIcon /> : <CopyIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
