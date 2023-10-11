export const dataFetch = async (url, method, body = {}) => {
    let options = {};
    let newData = { ...body };

    try {
        if (method === "POST" || method === "PUT") {
            options = {
                method: method,
                body: JSON.stringify(newData),
                headers: {
                    "Content-type": "application/json",
                }
            }
        } else if (method === "DELETE") {
            options = {
                method: method
            }
        } else { //Metodo Get
            options = {
                method: method,
                headers: {
                    "Accept": "application/json"
                }
            }
        }

        const response = await fetch(url, options);
        console.log("response", response)
        if (!response.ok) {

            let errorMsg = "El servidor retornó un error";
            try {
                const errorData = await response.json();
                errorMsg = errorData.message || errorMsg;
            } catch (parseError) {
                console.error("Error parsing error response", parseError);
            }

            throw new Error(`Error ${response.status}: ${errorMsg}`);
        }


        if (response.status === 204) {
            return {
                ok: true,
                data: {},
                msg: "Operación exitosa sin contenido"
            };
        };

        const data = await response.json();
        return {
            ok: true,
            data,
            msg: "Fetch realizado con éxito"
        };

    } catch (error) {

        console.error('FAILED while fetching', error);
        return {
            ok: false,
            msg: error.message
        };
    }
};
