"use client";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { DefaultLayout } from "@/shared/components/DefaultLayout";
import { GamepadIcon } from "@/shared/components/GamepadIcon";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const VaultPage = () => {
  useAuthRedirect({ requireAuth: true });
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
            <span
              className="text-[#F0F0F0] text-3xl font-bold tracking-[0.12em] uppercase"
              style={{ fontFamily: "'DM Mono', 'Courier New', monospace" }}
            >
              GAME VAULT
            </span>
          </div>
          <button onClick={() => logout()} disabled={isPending}>
            {isPending ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default VaultPage;
