import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defa = (message: string) => toast(message);
const info = (message: string) => toast.info(message);
const error = (message: string) => toast.error(message);
const success = (message: string) => toast.success(message);
const warning = (message: string) => toast.warning(message);


export const TrigToast = (message: string, type: string) => {
    switch (type) {
        case "default":
            defa(message)
            break;
        case "info":
            info(message)
            break;
        case "error":
            error(message)
            break;
        case "success":
            success(message)
            break;
        case "warning":
            warning(message)
            break;
        default:
            defa(message)
            break;
    }

}


export const range = (start:number, end:number) => {
    return Array.from({ length: end - start }, (_, i) => start + i);
  };
  