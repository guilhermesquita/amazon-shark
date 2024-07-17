import { useState, useEffect } from "react";
import ToastedCopied from "../toastCopied/ToastCopied";
import { createPaymentPix, requestBodyPost } from "@/service/pixApi";
import Spinner from "../Spinner/Spinner";

interface PixModel {
  qrCodeBase64: string;
  qrCode: string;
}

interface createPaymentPixProps{
  request: requestBodyPost;
}

export default function QrCodeField({request}: createPaymentPixProps) {
  const [toast, setToast] = useState(false);
  const [qrCodePix, setQrCodePix] = useState<PixModel | undefined>();

  useEffect(() => {
    (async () => {
      const qrCodeJson = await createPaymentPix(request);
      setQrCodePix({
        qrCodeBase64:
          qrCodeJson.point_of_interaction.transaction_data.qr_code_base64,
        qrCode: qrCodeJson.point_of_interaction.transaction_data.qr_code,
      });
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

  return qrCodePix ? (
    <section className="w-3/4 border-2 border-white flex flex-col items-center p-10 gap-10">
      <img
        src={`data:image/jpeg;base64, ${qrCodePix?.qrCodeBase64}`}
        width="400" className="rounded-lg"
      />
      <button
        onClick={copyText}
        className="py-2 px-3 flex rounded-md no-underline 
        bg-btn-background hover:bg-btn-background-hover"
      >
        copiar código QRCODE
      </button>
      {toast && <ToastedCopied />}
    </section>
  ) : (
    <div className="p-10">
      <Spinner />
    </div>
  );
}
