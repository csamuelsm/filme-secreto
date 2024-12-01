// Step 1: Import the parts of the module you want to use
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { NextResponse } from 'next/server';

// Step 2: Initialize the client object
const client = new MercadoPagoConfig(
    { accessToken: `${process.env.MERCADO_PAGO_KEY}`, options: {
        timeout: 1000 * 60 * 5
    } }
);

// Step 3: Initialize the API object
const payment = new Payment(client);

// Step 4: Create the request object
const body = {
	transaction_amount: 1.0,
	description: `Filme Secreto - Backdrop ${Date.now()}`,
	payment_method_id: 'pix',
	payer: {
        email: "filmesecreto@filmesecreto.com",
    },
};

// Step 5: Create request options object - Optional

function generateIdempotencyKey() {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

const requestOptions = {
	idempotencyKey: generateIdempotencyKey(),
};

// Step 6: Make the request
/*payment.create(
    { 
        body, 
        //requestOptions 
    }
).then(console.log)
.catch(console.log);*/

export const GET = async (req: Request) => {
    try {
        let response = await payment.create({ body });
        //console.log(response);
        return NextResponse.json({ qrcode: response?.point_of_interaction?.transaction_data, id: response?.id }, {status: 200});
    }
    catch (error) {
        //console.log(error);
        return NextResponse.json({ msg: error }, {status: 500});
    }    
  };

  export const POST = async (req: Request) => {
    const data = await req.json();
    try {

        const id = (data.id);

        let response = await payment.get({
            id: id,
        }
        );
        console.log(response);
    
        return NextResponse.json(
            // { game: movies[data.gameNumber - 1], number: data.gameNumber },
            { data: response },
            { status: 200 }
        );
    } catch (err) {
        console.log(err);
        return NextResponse.json({ msg: err }, { status: 500 });
    }
  };