const app = Vue.createApp({
    data() {
        return {
            buscar: "",
            juegos: [],
        }

    },
    computed: {
        juegosFiltrados() {
            return this.juegos.filter(j => j.nombre.toLowerCase().includes(this.buscar.toLowerCase()))
        }

    },
    methods: {
        verDesc(juego) {
            juego.mostrarDesc = !juego.mostrarDesc
        },
        eliminarJuego(id) {
            this.juegos = this.juegos.filter(juego => juego.id !== id)
        },
        fav(juego) {
            juego.favorito = !juego.favorito
            const juegoFav = this.juegos.filter(j => j.favorito).map(j => j.id)
            localStorage.setItem('favoritos', JSON.stringify(juegoFav))

        }

    },
    async mounted() {
        try {

            const response = await fetch('./data.json')
            const data = await response.json()
            this.juegos = data.map(item => ({
                ...item,
                mostrarDesc: false,
                favorito: false
            }))
            this.cargando = false
            const idsFavoritos = JSON.parse(localStorage.getItem('favoritos'))
            if (idsFavoritos) {
                this.juegos.forEach(juego => {
                    juego.favorito = idsFavoritos.includes(juego.id)
                })
            }
        } catch (error) {
            console.error('Error al acargar los datos: ', error)
        }

    }
})

app.mount("#app")