"use client";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/navigation";

function AlertModal({ fn, params }: any) {
  const router = useRouter();
  async function execute() {
    await fn(...params);
  
    router.push("/products");

  }
  return (
    <AlertDialogAction onClick={() => execute()}>Continue</AlertDialogAction>
  );
}
export default AlertModal;
