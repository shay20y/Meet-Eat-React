import { toast } from "react-toastify";

export const errorToastGlobel = () => { return toast.error("error occurred. Please try again later.") };
export const successToastGlobel = () => { return toast.success("Action completed successfully!") };
export const warnToastGlobel = () => { return toast.warn("Warning: This action might have unintended consequences.") };


export const errorToast = (mes) => { return toast.error(mes) }
export const successToast = (mes) => { return toast.success(mes) }
export const warnToass = (mes) => { return toast.warn(mes) }