import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { randomUUID } from 'node:crypto';

export const lambdaHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;

    try {
        const transactionId = JSON.parse(event.body as string);

        response = {
            statusCode: 200,
            body: JSON.stringify({
                transactionId: randomUUID(),
                message: 'payment refunded',
                originalTransactionId: transactionId,
            }),
        };
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
