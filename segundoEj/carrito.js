// Objeto Producto
function Producto(cantidad, descripcion) {
    this.cantidad = Number(cantidad);
    this.descripcion = descripcion;

    this.getCantidad = function() {
        return this.cantidad;
    }

    this.getDescripcion = function() {
        return this.descripcion;
    }
}

// FUNCIÓN PARA CREAR LA COOKIE
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

  const expires = "expires=" + d.toUTCString();
  const value = encodeURIComponent(JSON.stringify(cvalue));

  document.cookie = cname + "=" + value + ";" + expires + ";path=/";
}

// FUNCIÓN PARA LEER LA COOKIE (exactamente tu estilo)
function getCookie(cname) {
  const name = cname + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();

    if (c.indexOf(name) === 0) {
      const value = decodeURIComponent(c.substring(name.length));

      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
  }

  return null;
}

// Función para comprar producto desde el formulario
function comprarProducto() {
    var txtCantidad = document.getElementById("cantidad").value;
    var txtDescripcion = document.getElementById("descripcion").value;

    if (txtCantidad === "" || txtDescripcion === "") {
        alert("Rellena ambos campos");
        return;
    }

    // Obtenemos el carrito actual de la cookie o creamos uno nuevo
    var carrito = getCookie("carrito");
    if (!carrito) {
        carrito = [];
    }

    // Creamos el objeto producto y lo añadimos al array
    carrito.push(new Producto(txtCantidad, txtDescripcion));

    // Guardamos de nuevo en la cookie
    setCookie("carrito", carrito, 30);

    alert("¡Producto añadido!");
    document.getElementById("cantidad").value = "";
    document.getElementById("descripcion").value = "";
}

// Función para ver el carrito por consola
function verCarrito() {
    var carrito = getCookie("carrito");

    if (!carrito || carrito.length === 0) {
        console.log("El carrito está vacío.");
        return;
    }

    console.log("=== CONTENIDO DEL CARRITO ===");
    var totalProductos = 0;

    for (let i = 0; i < carrito.length; i++) {
        console.log("- " + carrito[i].cantidad + " " + carrito[i].descripcion);
        totalProductos += Number(carrito[i].cantidad);
    }

    console.log("TOTAL de productos: " + totalProductos);
}

// Asociar eventos a los botones al cargar la página
window.onload = function() {
    var btnComprar = document.getElementById("btnComprar");
    if (btnComprar) {
        btnComprar.onclick = comprarProducto;
    }

    var btnVer = document.getElementById("btnVerCarrito");
    if (btnVer) {
        btnVer.onclick = verCarrito;
    }
};