document.addEventListener("DOMContentLoaded", () => {

    const inicio = document.getElementById("inicio");
    const universo = document.getElementById("universo");

    const entrar = document.getElementById("entrar");
    const repetir = document.getElementById("repetir");

    const motos = [
        ...document.querySelectorAll(".moto")
    ];


    /* =====================================
       ENTRAR
    ===================================== */

    entrar.addEventListener("click", () => {

        inicio.classList.add("ocultar");

        setTimeout(() => {

            universo.classList.add("mostrar");

            iniciarOrbitas();

        }, 500);

    });


    /* =====================================
       VOLVER
    ===================================== */

    repetir.addEventListener("click", () => {

        universo.classList.remove("mostrar");

        inicio.classList.remove("ocultar");

    });


    /* =====================================
       ÓRBITAS
    ===================================== */

    let animando = false;

    function iniciarOrbitas() {

        if (animando) return;

        animando = true;

        const configuracion = motos.map((moto, indice) => {

            return {

                elemento: moto,

                // posición inicial diferente
                angulo:
                    (indice / motos.length) *
                    Math.PI *
                    2,

                // diferentes velocidades
                velocidad:
                    0.00045 +
                    indice * 0.000035,

                // diferentes tamaños
                escala:
                    0.75 +
                    (indice % 4) * 0.09

            };

        });


        function animar(tiempo) {

            const orbita =
                document.querySelector(".orbita");

            if (!orbita) return;


            const ancho =
                orbita.clientWidth;

            const alto =
                orbita.clientHeight;


            /*
             * RADIO HORIZONTAL
             *
             * Las motos recorren prácticamente
             * todo el espacio alrededor de Saturno.
             */

            const radioX =
                ancho * 0.43;


            /*
             * RADIO VERTICAL
             */

            const radioY =
                alto * 0.40;


            configuracion.forEach((item) => {

                /*
                 * Cada moto avanza
                 * constantemente.
                 */

                item.angulo += item.velocidad * 16;


                const x =
                    Math.cos(item.angulo) *
                    radioX;


                const y =
                    Math.sin(item.angulo) *
                    radioY;


                /*
                 * Cuanto más cerca está de la
                 * parte inferior, más grande parece.
                 *
                 * Esto crea sensación de profundidad.
                 */

                const profundidad =
                    (Math.sin(item.angulo) + 1) / 2;


                const escala =
                    item.escala *
                    (
                        0.72 +
                        profundidad * 0.45
                    );


                /*
                 * Las motos delanteras quedan
                 * por encima de Saturno.
                 *
                 * Las traseras quedan detrás.
                 */

                if (Math.sin(item.angulo) > 0) {

                    item.elemento.style.zIndex = 80;

                } else {

                    item.elemento.style.zIndex = 15;

                }


                /*
                 * Posición.
                 */

                item.elemento.style.left =
                    `calc(50% + ${x}px)`;

                item.elemento.style.top =
                    `calc(50% + ${y}px)`;


                /*
                 * Centrar cada moto
                 */

                item.elemento.style.transform =
                    `translate(-50%, -50%) scale(${escala})`;

            });


            requestAnimationFrame(animar);

        }


        requestAnimationFrame(animar);

    }

});