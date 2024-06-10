import { ref, watch } from 'vue';

export function currencyFormat(angka, withRp = true) {
    if (typeof angka !== 'number') {
        return 'Rp. 0,00';
    }

    const [integerPart, decimalPart = '00'] = angka.toFixed(2).split('.');
    const integerString = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return withRp ? `Rp. ${integerString},${decimalPart}` : `${integerString},${decimalPart}`;
}

export function isWebApp() {
    
    const width = ref(window.innerWidth);
    const isWeb = ref(window.innerWidth > 767 ? true : false)

    watch(width, (newWidth, oldWidth) => {
        console.log('Width changed from', oldWidth, 'to', newWidth);
        console.log(isWeb.value,'<<< Kondisi apakah dalam tampilan web?');
    });

    // Update width when window is resized
    window.addEventListener('resize', () => {
        width.value = window.innerWidth;
        isWeb.value = window.innerWidth > 767 ? true : false
    });

    return isWeb.value
}