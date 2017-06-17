'use strict';

const client = new ApiAi.ApiAiClient({accessToken: '52758f19e33a45b7a455c5d20298bef6'});

function requestApiAi(request, userUid, handleResponse) {
    let promise = client.textRequest(request);
    promise
        .then(handleResponse)
        .catch(handleError);
}

function handleError(serverError) {
    console.log(serverError);
}
