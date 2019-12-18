import Swal from 'sweetalert2';

export default class Alert {
    static success = (message, onClose=null) => {
        Swal.fire({
            // title: 'Success!',
            text: message,
            onClose: onClose
        })
    }

    static error = (message) => {
        Swal.fire({
            title: 'エラー',
            icon: 'error',
            text: message,
        })
    }

    static confirm = (message) => {
        return Swal.fire({
            title: '確認',
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: "キャンセル",
        })
    }
}