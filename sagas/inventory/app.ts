import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { randomUUID } from 'node:crypto';

export const lambdaHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;

    try {
        const sku = JSON.parse(event.body as string);
        if (sku == 'X') {
            response = {
                statusCode: 400,
                body: JSON.stringify({
                    message: `${sku} out of stock`,
                }),
            };
        } else {
            response = {
                statusCode: 200,
                body: JSON.stringify({
                    reservationId: randomUUID(),
                    sku,
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
