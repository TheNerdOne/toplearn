import { toast } from "react-toastify";

export const successMsg = (msg) => {
  toast.success(msg, {
    position: "top-right",
    closeOnClick: true,
  });
};
export const errorMsg = (msg) => {
  toast.error(msg, {
    position: "bottom-right",
    closeOnClick: true,
  });
};
