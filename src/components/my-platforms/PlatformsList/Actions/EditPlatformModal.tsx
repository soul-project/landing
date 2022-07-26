import { useSession } from "next-auth/react";
import React from "react";
import { useQuery } from "react-query";

import { getPlatform, GetPlatformArgs } from "src/modules/platforms/actions";

import PlatformFormModal from "src/components/my-platforms/shared/PlatformFormModal";

export default function EditPlatformModal({
  isOpen,
  onClose,
  platformId,
}: Props) {
  const { data: session } = useSession();
  const args: GetPlatformArgs = {
    accessToken: session!.accessToken,
    platformId,
  };
  const { data } = useQuery([getPlatform.key, args], () => getPlatform(args));

  return (
    <PlatformFormModal
      isOpen={isOpen}
      onClose={onClose}
      initialValues={
        data && { redirectUris: data.redirectUris, name: data.name }
      }
      title="Edit platform"
      handleSubmit={() => {}} // TODO: Implement this
    />
  );
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  platformId: number;
};
