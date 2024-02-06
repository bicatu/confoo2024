import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { randomUUID } from 'node:crypto';

export const lambdaHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;

    try {
        const amount = event.body;
        if (amount == undefined) throw new Error('amount is required');

        if (parseFloat(amount) > 100) {
            response = {
                statusCode: 400,
                body: JSON.stringify({
                    transactionId: randomUUID(),
                    message: 'transaction declined',
                    amount: parseFloat(amount),
                }),
            };
        } else {
            response = {
                statusCode: 200,
                body: JSON.stringify({
                    transactionId: randomUUID(),
                    messsage: 'transaction approved',
                    amount: parseFloat(amount),
                }),
            };
        }
    } catch (err) {
        // Error handling
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    } finally {
    }

    return response;
};
