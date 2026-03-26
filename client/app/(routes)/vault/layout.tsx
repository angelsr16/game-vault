"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import useUser from "@/hooks/useUser";
import { DefaultLayout } from "@/shared/components/DefaultLayout";
import { GamepadIcon } from "@/shared/components/GamepadIcon";
import axiosInstance from "@/utils/axiosInstance";

const VaultLayout = ({ children }: { children: ReactNode }) => {
  useAuthRedirect({ requireAuth: true });

  const { user, isLoading, isFetched } = useUser();

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => axiosInstance.post("/api/v1/auth/logout"),
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
    },
  });

  return (
    <DefaultLayout opacity={30}>
      <div className="w-full flex items-center h-18 bg-linear-to-b from-black to-black/0  ">
        <div className="max-w-6xl w-full mx-auto flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <GamepadIcon size={35} />
            <span className="text-[#F0F0F0] text-3xl font-bold tracking-[0.12em] uppercase">
              GAME VAULT
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <span className="font-bold cursor-pointer lowercase">
              {!isLoading && isFetched && user.name}
            </span>
            <button onClick={() => logout()} disabled={isPending}>
              {isPending ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-10">{children}</div>
    </DefaultLayout>
  );
};

export default VaultLayout;
