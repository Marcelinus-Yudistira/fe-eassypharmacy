import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useErrorHandlerStore = defineStore('errorHandler', () => {
    const error = ref(null)
    const errorChecker = async (statusCode) => {
        switch (statusCode) {
            case 400:
                return 'Bad Request: Permintaan yang tidak sah'
            case 401:
                return 'Unauthorized: Tidak terautentikasi'
            case 403:
                return 'Forbidden: Akses ditolak'
            case 404:
                return 'Not Found: Data tidak ditemukan'
            case 409:
                return 'Conflict: Data sudah pernah digunakan'
            case 500:
                return 'Internal Server Error: Server sedang bermasalah'
            default:
                return `Error: Kode status ${statusCode} tidak dikenali.`
        } 
    }

    return { error, errorChecker }
})