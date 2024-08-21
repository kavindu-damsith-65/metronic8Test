import Swal from 'sweetalert2';


export function Host(){
    return "http://localhost:3001/api/"
}


export const range = (start, end) => {
    return Array.from({ length: end - start }, (_, i) => start + i);
  };

export   function shortenDescription(description, maxLength) {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + '...';
    }
    return description;
  }
  

export  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true
  });