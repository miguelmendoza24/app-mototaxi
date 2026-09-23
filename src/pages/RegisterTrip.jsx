function RegisterTrip() {
    return (
        <section>
            <h1>Registrar Viaje</h1>
            <form>
                <label htmlFor="pickup">Punto de inicio</label>
                <input
                    type="text"
                    id="pickup"
                    name="pickup"
                    required
                />
                <label htmlFor="destination">Destino</label>
                <input
                    type="text"
                    id="destination"
                    name="destination"
                    required
                />
                <label htmlFor="price">Precio</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    min="0.01"
                    step="0.01"
                    required
                />
                <button type="submit">Registrar Viaje</button>
            </form>
        </section>
    )
}
export default RegisterTrip;