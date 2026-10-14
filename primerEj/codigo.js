function Tiempo(anno, mes, dia, hora, minuto, segundo) {
    // 1. Inicialización de propiedades (si todo es 0, usamos la fecha/hora actual)
    if (anno === 0 && mes === 0 && dia === 0 && hora === 0 && minuto === 0 && segundo === 0) {
        var ahora = new Date();
        this.anno = ahora.getFullYear();
        this.mes = ahora.getMonth() + 1; // getMonth() va de 0 a 11
        this.dia = ahora.getDate();
        this.hora = ahora.getHours();
        this.minuto = ahora.getMinutes();
        this.segundo = ahora.getSeconds();
    } else {
        this.anno = anno;
        this.mes = mes;
        this.dia = dia;
        this.hora = hora;
        this.minuto = minuto;
        this.segundo = segundo;
    }

    // 2. Getters y Setters
    this.getAnno = function() { return this.anno; };
    this.setAnno = function(a) { this.anno = a; };

    this.getMes = function() { return this.mes; };
    this.setMes = function(m) { this.mes = m; };

    this.getDia = function() { return this.dia; };
    this.setDia = function(d) { this.dia = d; };

    this.getHora = function() { return this.hora; };
    this.setHora = function(h) { this.hora = h; };

    this.getMinuto = function() { return this.minuto; };
    this.setMinuto = function(min) { this.minuto = min; };

    this.getSegundo = function() { return this.segundo; };
    this.setSegundo = function(s) { this.segundo = s; };

    this.getFechaCompleta = function() {
        var d = this.dia < 10 ? "0" + this.dia : this.dia;
        var m = this.mes < 10 ? "0" + this.mes : this.mes;
        return d + "/" + m + "/" + this.anno;
    };

    this.getHoraCompleta = function() {
        var h = this.hora < 10 ? "0" + this.hora : this.hora;
        var min = this.minuto < 10 ? "0" + this.minuto : this.minuto;
        var s = this.segundo < 10 ? "0" + this.segundo : this.segundo;
        return h + ":" + min + ":" + s;
    };

    // 4. Comprobar si es bisiesto
    this.esBisiesto = function() {
        var a = this.anno;
        return (a % 4 === 0 && a % 100 !== 0) || (a % 400 === 0);
    };

    // Método interno para pasar a Date
    this.aFecha = function() {
        return new Date(this.anno, this.mes - 1, this.dia, this.hora, this.minuto, this.segundo);
    };

    // 5, 6 y 7. Métodos de comparación
    this.esMayor = function(otroTiempo) {
        return this.aFecha().getTime() > otroTiempo.aFecha().getTime();
    };

    this.esMenor = function(otroTiempo) {
        return this.aFecha().getTime() < otroTiempo.aFecha().getTime();
    };

    this.esIgual = function(otroTiempo) {
        return this.aFecha().getTime() === otroTiempo.aFecha().getTime();
    };

    // 8. sumaHora(otroTiempo)
    this.sumaHora = function(otroTiempo) {
        var msASumar = (otroTiempo.getHora() * 3600 + otroTiempo.getMinuto() * 60 + otroTiempo.getSegundo()) * 1000;
        var nuevaFecha = new Date(this.aFecha().getTime() + msASumar);
        
        this.anno = nuevaFecha.getFullYear();
        this.mes = nuevaFecha.getMonth() + 1;
        this.dia = nuevaFecha.getDate();
        this.hora = nuevaFecha.getHours();
        this.minuto = nuevaFecha.getMinutes();
        this.segundo = nuevaFecha.getSeconds();
    };
}


// ==========================================
// EJEMPLOS DE USO
// ==========================================

console.log("=== PRUEBAS TIEMPO (SIN PROTOTIPOS) ===");

var tActual = new Tiempo(0, 0, 0, 0, 0, 0);
console.log("Fecha actual -> " + tActual.getFechaCompleta() + " " + tActual.getHoraCompleta());

var t1 = new Tiempo(2024, 2, 29, 10, 0, 0);
var t2 = new Tiempo(2026, 10, 13, 12, 30, 0);

console.log("T1: " + t1.getFechaCompleta() + " " + t1.getHoraCompleta());
console.log("T2: " + t2.getFechaCompleta() + " " + t2.getHoraCompleta());

console.log("¿Es T1 bisiesto?: " + t1.esBisiesto()); // true
console.log("¿Es T1 menor que T2?: " + t1.esMenor(t2)); // true

// Sumar horas
var tSuma = new Tiempo(0, 0, 0, 4, 15, 0); // 4 horas y 15 minutos
t1.sumaHora(tSuma);
console.log("Nuevo T1 tras sumar 4h 15m -> " + t1.getHoraCompleta());