import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { randomUUID } from 'node:crypto';

export const lambdaHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;

    try {
        const amount = event.body;
        if (amount == undefined) throw new Error('amount is required');

        if (parseFloat(amount) > 1000) {
            response = {
                statusCode: 400,
                body: JSON.stringify({
                    fraudCaseId: randomUUID(),
                    message: 'fraud case declined',
                }),
            };
        } else {
            response = {
                statusCode: 200,
                body: JSON.stringify({
                    fraudCaseId: randomUUID(),
                    messsage: 'fraud case approved',
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
