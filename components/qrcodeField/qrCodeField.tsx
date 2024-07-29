import { useState, useEffect } from "react";
import ToastedCopied from "../toastCopied/ToastCopied";
import {
  createPaymentPix,
  getPaymentPix,
  requestBodyPost,
} from "@/service/pixApi";
import Spinner from "../Spinner/Spinner";
import { FaCheckCircle } from "react-icons/fa";
import { editVerificationById } from "../actions";
import { useRouter } from "next/navigation";
import { UserContextType, useUser } from "@/app/context/userContext";

interface PixModel {
  qrCodeBase64: string;
  qrCode: string;
}

interface createPaymentPixProps {
  request: requestBodyPost;
}

export default function QrCodeField({ request }: createPaymentPixProps) {

  const router = useRouter();

  const [toast, setToast] = useState(false);
  const [qrCodePix, setQrCodePix] = useState<PixModel | undefined>();
  const [idPayment, setIdPayment] = useState(0);
  const [approvedPayment, setApprovedPayment] = useState(false);

  const {user} = useUser() as UserContextType

  useEffect(() => {
    (async () => {
      const qrCodeJson = await createPaymentPix(request);
      setQrCodePix({
        qrCodeBase64:
          qrCodeJson.point_of_interaction.transaction_data.qr_code_base64,
        qrCode: qrCodeJson.point_of_interaction.transaction_data.qr_code,
      });

      setIdPayment(qrCodeJson.id);
    })();
    if (toast) {
      const timer = setTimeout(() => {
        setToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const copyText = () => {
    const textToCopy = qrCodePix?.qrCode as string;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Texto copiado com sucesso!");
      })
      .catch((err) => {
        console.error("Erro ao copiar texto: ", err);
      });
    setToast(true);
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (qrCodePix !== undefined) {
        const getPixPaymentConfirmation = await getPaymentPix(idPayment);
        console.log(getPixPaymentConfirmation.status);
        if (getPixPaymentConfirmation.status === "approved") {
          clearInterval(intervalId);
          setApprovedPayment(true)
          const idClient = user?.id as string
          await editVerificationById(idClient)
          router.push('/')
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [qrCodePix, idPayment]);

  return qrCodePix ? (
    <section className="w-3/4 border-2 border-white flex flex-col items-center p-10 gap-10">
      {approvedPayment ? (
        <div className="flex items-center gap-5 h-full w-full">
        <FaCheckCircle size={50} color="#1BB947"/>  Pagamento Aprovado!
        </div>
      ) : (
        <div className="h-full w-full flex flex-col justify-center items-center gap-4">
          <img
            src={`data:image/jpeg;base64, ${qrCodePix?.qrCodeBase64}`}
            width="400"
            className="rounded-lg"
          />
          <button
            onClick={copyText}
            className="py-2 px-3 flex rounded-md no-underline 
        bg-btn-background hover:bg-btn-background-hover"
          >
            copiar código QRCODE
          </button>
          {toast && <ToastedCopied />}
        </div>
      )}
    </section>
  ) : (
    <div className="p-10">
      <Spinner />
    </div>
  );
}
